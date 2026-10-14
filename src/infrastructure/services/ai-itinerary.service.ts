import { inject, injectable } from 'tsyringe';

import { TOKENS } from '../../infrastructure/di/tokens';

import { IAIModelService } from '../../application/interfaces/services/ai-model.service.interface';
import { IAiItineraryService } from '../../application/interfaces/services/ai-itinerary.service.interface';

import { TripPlanningContext } from '../../application/dtos/itenary/request/ai-itinery-trip-context.dto';
import { GeneratedActivity, GeneratedDay, GeneratedItinerary } from '../../application/dtos/itenary/response/ai-itinerary-result.dto';
import { SwapActivityRequestDTO } from '../../application/dtos/itenary/request/swap-activity.dto';
import { RegenerateDayRequestDTO } from '../../application/dtos/itenary/request/regenerate-day.dto';

import { createItineraryGraph } from '../ai/ai-itinerary/itinerary.graph';
import { IPlacesService } from '../../application/interfaces/services/places.service.interface';

@injectable()
export class AiItineraryService implements IAiItineraryService {
  constructor(
    @inject(TOKENS.IAIModelService)
    private readonly _aiModel: IAIModelService,
    @inject(TOKENS.IPlacesService)
    private readonly _placesService: IPlacesService,
  ) {}

  async generate(context: TripPlanningContext): Promise<GeneratedItinerary> {
    const graph = createItineraryGraph(this._aiModel, this._placesService);
    const result = await graph.invoke({
      context,
    });
    const itinerary = result.generatedItinerary;
    if (itinerary && result.placesContext) {
      const allGooglePlaces = [
        ...(result.placesContext.attractions || []),
        ...(result.placesContext.restaurants || []),
        ...(result.placesContext.cafes || []),
        ...(result.placesContext.parks || []),
        ...(result.placesContext.hotels || []),
        ...(result.placesContext.viewpoints || []),
        ...(result.placesContext.shopping || []),
      ];

      for (const day of itinerary.days || []) {
        for (const activity of day.activities || []) {
          const match = allGooglePlaces.find(
            (p) =>
              p.name.toLowerCase() === activity.title.toLowerCase() ||
              (activity.location && activity.location.toLowerCase().includes(p.name.toLowerCase())) ||
              (activity.title && p.name.toLowerCase().includes(activity.title.toLowerCase())),
          );
          if (match && match.latitude && match.longitude) {
            activity.latitude = match.latitude;
            activity.longitude = match.longitude;
          }
        }
      }
    }
    if (itinerary) {
      this.sanitizeAndOptimizeTimeline(itinerary);
    }
    return itinerary!;
  }

  async swapActivity(request: SwapActivityRequestDTO): Promise<GeneratedActivity> {
    const excludedList = (request.excludePlaces || [])
      .filter(Boolean)
      .map((p) => `- ${p}`)
      .join('\n');

    const surroundingContext: string[] = [];
    if (request.previousActivity) {
      surroundingContext.push(
        `Preceding Activity: "${request.previousActivity.title}"` +
          (request.previousActivity.category ? ` (Category: ${request.previousActivity.category})` : '') +
          (request.previousActivity.location ? ` at ${request.previousActivity.location}` : '') +
          (request.previousActivity.startTime ? `, starts at ${request.previousActivity.startTime}` : '') +
          (request.previousActivity.durationMinutes ? ` (lasts ~${request.previousActivity.durationMinutes} mins)` : ''),
      );
    }
    if (request.nextActivity) {
      surroundingContext.push(
        `Succeeding Activity: "${request.nextActivity.title}"` +
          (request.nextActivity.category ? ` (Category: ${request.nextActivity.category})` : '') +
          (request.nextActivity.location ? ` at ${request.nextActivity.location}` : '') +
          (request.nextActivity.startTime ? `, starts at ${request.nextActivity.startTime}` : ''),
      );
    }
    if (request.dayActivitiesOutline && request.dayActivitiesOutline.length > 0) {
      surroundingContext.push(
        `Day's other planned activities:\n${request.dayActivitiesOutline.map((a) => `  * ${a}`).join('\n')}`,
      );
    }

    const contextSection =
      surroundingContext.length > 0
        ? `\nCONTEXT & SURROUNDING SCHEDULE (CRITICAL FOR ACCURATE ALIGNMENT):\n${surroundingContext.join('\n')}\n`
        : '';

    const systemPrompt = `You are TravelBuddy AI, an expert travel planner.
You must suggest ONE high-quality replacement activity for a trip to ${request.destination}.
It replaces "${request.currentActivity.title}" on ${request.dayDate || 'this day'}.

TIMING & PACING:
- Target time slot: ${request.currentActivity.startTime || '10:00'} (suggested duration: ${request.currentActivity.durationMinutes || 60} mins)
- Trip Pace: ${request.tripPace || 'Balanced'}
- Interests: ${(request.interests || []).join(', ') || 'General'}
${request.dietary ? `- Dietary / Dining style: ${request.dietary}` : ''}
${request.customInstruction ? `\nUSER'S SPECIAL REQUEST / ADVICE FOR THIS SWAP:\n"${request.customInstruction}"\nCRITICAL: Give top priority to satisfying the user's specific request while maintaining geographical coherence with surrounding stops.\n` : ''}
${contextSection}
ALIGNMENT & ROUTE EFFICIENCY RULES:
1. GEOGRAPHIC PROXIMITY: The replacement must be geographically sensible relative to the preceding stop and succeeding stop. Place it nearby or directly en route to avoid zigzagging across town.
2. SCHEDULE & FLOW: Ensure seamless chronological fit for ${request.currentActivity.startTime || '10:00'}. Do NOT introduce redundant activity types (e.g. do not suggest another meal if the previous or next activity is already food).
3. EXCLUSIVITY: Do NOT suggest any duplicate places.

STRICT EXCLUSION RULES:
Do NOT suggest "${request.currentActivity.title}" or any of the following places because they are already planned for other parts of the trip:
${excludedList || '- None'}

Return ONLY a valid JSON object matching this schema without markdown or extra text:
{
  "title": "string",
  "description": "string (1-2 sentences)",
  "category": "FOOD | TRANSPORT | ACCOMMODATION | ACTIVITY | SIGHTSEEING | OTHER",
  "location": "string",
  "latitude": 35.7147,
  "longitude": 139.7966,
  "startTime": "${request.currentActivity.startTime || '10:00'}",
  "durationMinutes": ${request.currentActivity.durationMinutes || 60}
}
Provide realistic latitude and longitude coordinates for this activity.`;

    const response = await this._aiModel.complete({
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Suggest a replacement activity in ${request.destination} to replace "${request.currentActivity.title}".${request.customInstruction ? ` Preference: ${request.customInstruction}` : ''}`,
        },
      ],
      options: {
        temperature: 0.7,
        maxTokens: 500,
        responseFormat: 'json',
      },
    });

    const parsed = this.cleanAndParseJson(response.text);
    return {
      title: parsed.title || 'Alternative Activity',
      description: parsed.description || undefined,
      category: this.normalizeCategory(parsed.category),
      location: parsed.location || request.destination,
      latitude: parsed.latitude ? Number(parsed.latitude) : undefined,
      longitude: parsed.longitude ? Number(parsed.longitude) : undefined,
      startTime: parsed.startTime || request.currentActivity.startTime || '10:00',
      durationMinutes:
        Number(parsed.durationMinutes) || request.currentActivity.durationMinutes || 60,
    };
  }

  async regenerateDay(request: RegenerateDayRequestDTO): Promise<GeneratedDay> {
    const excludedList = (request.excludePlaces || [])
      .filter(Boolean)
      .map((p) => `- ${p}`)
      .join('\n');

    const systemPrompt = `You are TravelBuddy AI, an expert travel planner.
Generate a realistic 1-day itinerary for Day ${request.dayNumber} (${request.date}) in ${request.destination}.
Morning starts at: ${request.startFromLocation || request.destination}
Day ends at: ${request.endAtLocation || request.startFromLocation || request.destination}
Trip Pace: ${request.tripPace || 'Balanced'}
Companions: ${request.companions || 'Group'}
Interests: ${(request.interests || []).join(', ') || 'General'}
${request.dietary ? `Dietary preferences: ${request.dietary}` : ''}
${request.transportMode ? `Transport Mode: ${request.transportMode}` : ''}
${request.notes ? `General Trip Notes: ${request.notes}` : ''}
${request.customInstruction ? `\nUSER'S SPECIAL REQUEST / ADVICE FOR THIS DAY:\n"${request.customInstruction}"\nCRITICAL: Give top priority to shaping the theme, vibe, and schedule of this day around the user's advice.\n` : ''}

STRICT EXCLUSION RULES:
Do NOT include any of the following attractions, restaurants, or places because they are already visited on other days:
${excludedList || '- None'}

Plan 3 to 5 realistic, chronological activities for this day.
CATEGORIES (use exactly one): FOOD, TRANSPORT, ACCOMMODATION, ACTIVITY, SIGHTSEEING, OTHER

Return ONLY a valid JSON object matching this schema without markdown or extra text:
{
  "date": "${request.date}",
  "location": "string",
  "latitude": 35.7147,
  "longitude": 139.7966,
  "summary": "string",
  "activities": [
    {
      "title": "string",
      "description": "string",
      "category": "FOOD | TRANSPORT | ACCOMMODATION | ACTIVITY | SIGHTSEEING | OTHER",
      "location": "string",
      "latitude": 35.7147,
      "longitude": 139.7966,
      "startTime": "HH:mm",
      "durationMinutes": 60
    }
  ]
}
Provide realistic latitude and longitude coordinates for each activity.`;

    const response = await this._aiModel.complete({
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Generate an alternative 1-day itinerary for Day ${request.dayNumber} (${request.date}) in ${request.destination}.${request.customInstruction ? ` Specific preferences: ${request.customInstruction}` : ''}`,
        },
      ],
      options: {
        temperature: 0.7,
        maxTokens: 1500,
        responseFormat: 'json',
      },
    });

    const parsed = this.cleanAndParseJson(response.text);
    const dayResult: GeneratedDay = {
      date: request.date,
      location: parsed.location || request.destination,
      latitude: parsed.latitude ? Number(parsed.latitude) : undefined,
      longitude: parsed.longitude ? Number(parsed.longitude) : undefined,
      summary: parsed.summary || `Day ${request.dayNumber} Exploration`,
      activities: Array.isArray(parsed.activities)
        ? parsed.activities.map((act: any) => ({
            title: act.title || 'Activity',
            description: act.description || undefined,
            category: this.normalizeCategory(act.category),
            location: act.location || undefined,
            latitude: act.latitude ? Number(act.latitude) : undefined,
            longitude: act.longitude ? Number(act.longitude) : undefined,
            startTime: act.startTime || '10:00',
            durationMinutes: Number(act.durationMinutes) || 60,
          }))
        : [],
    };
    this.sanitizeAndOptimizeDay(dayResult);
    return dayResult;
  }

  private sanitizeAndOptimizeTimeline(itinerary: GeneratedItinerary): void {
    if (!itinerary || !Array.isArray(itinerary.days)) return;
    for (const day of itinerary.days) {
      this.sanitizeAndOptimizeDay(day);
    }
  }

  private sanitizeAndOptimizeDay(day: GeneratedDay): void {
    if (!day || !Array.isArray(day.activities) || day.activities.length === 0) return;

    // 1. Remove dummy transit cards (e.g. "Drive to Waterfall", "Travel to Old Goa")
    const cleaned: GeneratedActivity[] = [];
    for (let i = 0; i < day.activities.length; i++) {
      const act = day.activities[i];
      const isDummyTransit =
        /^(drive|travel|head|commute|transfer|walk)\s+(to|towards)\s+/i.test(act.title.trim()) &&
        i < day.activities.length - 1;

      if (!isDummyTransit) {
        // Clean up robotic titles
        act.title = act.title
          .replace(/^official\s+/i, '')
          .replace(/\s+booking\s+and\s+visit$/i, ' Visit & Tour')
          .replace(/\s+booking\s+station$/i, '')
          .trim();
        cleaned.push(act);
      }
    }

    // 1.5. Optimize Route Sequence (Eliminate Zigzag / Backtracking)
    if (cleaned.length >= 3) {
      this.optimizeActivitySequence(cleaned);
    }

    // 2. Cascade timing adjustments to ensure real-world commute buffer
    for (let i = 0; i < cleaned.length - 1; i++) {
      const current = cleaned[i];
      const next = cleaned[i + 1];

      const currentStartMins = this.parseTimeToMinutes(current.startTime || '09:00');
      const duration = current.durationMinutes && current.durationMinutes > 0 ? current.durationMinutes : 60;
      const currentEndMins = currentStartMins + duration;

      const commuteMins = this.estimateCommuteMinutes(current, next);
      const earliestNextMins = Math.ceil((currentEndMins + commuteMins) / 5) * 5;

      const nextStartMins = this.parseTimeToMinutes(next.startTime || '10:00');

      if (nextStartMins < earliestNextMins) {
        next.startTime = this.formatMinutesToTime(earliestNextMins);
      }
    }

    day.activities = cleaned;
  }

  private parseTimeToMinutes(timeStr: string): number {
    const parts = (timeStr || '09:00').trim().split(':');
    const h = parseInt(parts[0], 10) || 9;
    const m = parseInt(parts[1], 10) || 0;
    return h * 60 + m;
  }

  private formatMinutesToTime(totalMins: number): string {
    const normalized = Math.min(totalMins, 23 * 60 + 55); // Cap at 23:55
    const h = Math.floor(normalized / 60);
    const m = normalized % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  private estimateCommuteMinutes(
    from: GeneratedActivity,
    to: GeneratedActivity,
  ): number {
    if (
      from.latitude != null &&
      from.longitude != null &&
      to.latitude != null &&
      to.longitude != null
    ) {
      const distKm = this.haversineDistanceKm(
        from.latitude,
        from.longitude,
        to.latitude,
        to.longitude,
      );

      // Same venue / building (< 150m)
      if (distKm < 0.15) {
        return 5;
      }
      // Walking distance (<= 1.2km)
      if (distKm <= 1.2) {
        return Math.max(5, Math.ceil(distKm / 0.08) + 5);
      }
      // Driving distance (> 1.2km): ~28km/h average city + 10 min parking & traffic buffer
      return Math.max(15, Math.ceil((distKm / 28) * 60) + 10);
    }
    return 15; // default transition buffer
  }

  private haversineDistanceKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private cleanAndParseJson(text: string): any {
    try {
      const cleaned = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      return JSON.parse(cleaned);
    } catch {
      const firstBrace = text.indexOf('{');
      const lastBrace = text.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        return JSON.parse(text.substring(firstBrace, lastBrace + 1));
      }
      throw new Error('Failed to parse AI response as JSON');
    }
  }

  private normalizeCategory(cat: unknown): string {
    if (typeof cat !== 'string') return 'OTHER';
    const upper = cat.toUpperCase();
    if (['FOOD', 'TRANSPORT', 'ACCOMMODATION', 'ACTIVITY', 'SIGHTSEEING', 'OTHER'].includes(upper))
      return upper;
    if (upper.includes('FOOD') || upper.includes('CAFE') || upper.includes('RESTAURANT'))
      return 'FOOD';
    if (upper.includes('TRANSPORT') || upper.includes('DRIVE') || upper.includes('TRAIN'))
      return 'TRANSPORT';
    if (upper.includes('HOTEL') || upper.includes('STAY')) return 'ACCOMMODATION';
    if (upper.includes('SIGHT') || upper.includes('TEMPLE') || upper.includes('MONASTERY'))
      return 'SIGHTSEEING';
    return 'ACTIVITY';
  }

  /**
   * Optimizes the sequence of daily activities using Traveling Salesperson (TSP)
   * shortest path evaluation to eliminate backtracking and crisscross driving.
   */
  private optimizeActivitySequence(activities: GeneratedActivity[]): void {
    if (activities.length <= 2) return;

    // Check if at least 3 activities have coordinates
    const withCoords = activities.filter(
      (a) => a.latitude != null && a.longitude != null
    );
    if (withCoords.length < 3) return;

    // Keep the morning anchor (first activity) fixed
    const first = activities[0];
    const rest = activities.slice(1);

    // Generate permutations of the remaining activities (N <= 5, max 24 permutations)
    const permutations = this.getPermutations(rest);
    let bestPermutation = rest;
    let minDistance = this.calculatePathDistance([first, ...rest]);

    for (const perm of permutations) {
      const fullPath = [first, ...perm];
      const dist = this.calculatePathDistance(fullPath);
      if (dist < minDistance) {
        minDistance = dist;
        bestPermutation = perm;
      }
    }

    // Replace rest with bestPermutation
    for (let i = 0; i < bestPermutation.length; i++) {
      activities[i + 1] = bestPermutation[i];
    }
  }

  private calculatePathDistance(path: GeneratedActivity[]): number {
    let total = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const from = path[i];
      const to = path[i + 1];
      if (
        from.latitude != null &&
        from.longitude != null &&
        to.latitude != null &&
        to.longitude != null
      ) {
        total += this.haversineDistanceKm(
          from.latitude,
          from.longitude,
          to.latitude,
          to.longitude
        );
      }
    }
    return total;
  }

  private getPermutations<T>(arr: T[]): T[][] {
    if (arr.length <= 1) return [arr];
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
      const childPerms = this.getPermutations(remaining);
      for (const p of childPerms) {
        result.push([current, ...p]);
      }
    }
    return result;
  }
}
