import { GeneratedItinerarySchema } from '../../../../presentation/validators/trip/itinerary.validator';
import { ItineraryGraphState } from '../itinerary.states';

const VALID_CATEGORIES = [
  'FOOD',
  'TRANSPORT',
  'ACCOMMODATION',
  'ACTIVITY',
  'SIGHTSEEING',
  'OTHER',
] as const;

function normalizeCategory(rawCat: unknown): string {
  if (typeof rawCat !== 'string') return 'OTHER';
  const upper = rawCat.toUpperCase().trim();

  // Exact match
  if (VALID_CATEGORIES.includes(upper as any)) return upper;

  // Multi-category strings like "FOOD, TRANSPORT" -> match first valid keyword
  for (const cat of VALID_CATEGORIES) {
    if (upper.includes(cat)) return cat;
  }

  // Common synonyms / variants
  if (
    upper.includes('PARK') ||
    upper.includes('MUSEUM') ||
    upper.includes('BEACH') ||
    upper.includes('MONUMENT') ||
    upper.includes('VIEW')
  ) {
    return 'SIGHTSEEING';
  }
  if (
    upper.includes('RESTAURANT') ||
    upper.includes('CAFE') ||
    upper.includes('DINING') ||
    upper.includes('LUNCH') ||
    upper.includes('DINNER') ||
    upper.includes('BREAKFAST')
  ) {
    return 'FOOD';
  }
  if (
    upper.includes('HOTEL') ||
    upper.includes('STAY') ||
    upper.includes('HOSTEL') ||
    upper.includes('RESORT')
  ) {
    return 'ACCOMMODATION';
  }
  if (
    upper.includes('FLIGHT') ||
    upper.includes('TRAIN') ||
    upper.includes('DRIVE') ||
    upper.includes('TRAVEL') ||
    upper.includes('RIDE')
  ) {
    return 'TRANSPORT';
  }

  return 'OTHER';
}

function sanitizeItinerary(parsed: any): void {
  if (!parsed || typeof parsed !== 'object') return;
  if (!Array.isArray(parsed.days)) return;

  for (const day of parsed.days) {
    if (!day || typeof day !== 'object') continue;
    if (!Array.isArray(day.activities)) continue;

    for (const act of day.activities) {
      if (!act || typeof act !== 'object') continue;

      // Normalize category
      act.category = normalizeCategory(act.category);

      // Ensure durationMinutes is a positive integer
      const dur = Number(act.durationMinutes);
      act.durationMinutes = !isNaN(dur) && dur > 0 ? Math.round(dur) : 30;

      // Ensure startTime is formatted HH:mm
      if (typeof act.startTime === 'string') {
        const match = act.startTime.trim().match(/^(\d{1,2}):(\d{2})$/);
        if (match) {
          act.startTime = `${match[1].padStart(2, '0')}:${match[2]}`;
        } else {
          act.startTime = '09:00';
        }
      } else {
        act.startTime = '09:00';
      }
    }
  }
}

export async function validateResponseNode(state: ItineraryGraphState) {
  try {
    const first = state.rawAiResponse!.indexOf('{');
    const last = state.rawAiResponse!.lastIndexOf('}');

    if (first === -1 || last === -1) {
      return {
        validationErrors: ['No JSON object found.'],
      };
    }

    const cleaned = state.rawAiResponse!.substring(first, last + 1);
    console.log('====== CLEANED ======');
    console.log(cleaned);
    console.log('=====================');
    const parsed = JSON.parse(cleaned);

    sanitizeItinerary(parsed);

    GeneratedItinerarySchema.parse(parsed);
    return {
      generatedItinerary: parsed,
      validationErrors: [],
    };
  } catch (error: any) {
    return {
      validationErrors: [error.message],
    };
  }
}
