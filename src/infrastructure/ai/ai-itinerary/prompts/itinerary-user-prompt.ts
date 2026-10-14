import { TripPlanningContext } from '../../../../application/dtos/itenary/request/ai-itinery-trip-context.dto';
import { AIPlacesContext } from '../nodes/place-context.node';
import { buildPlacesSection } from './build-places-prompt-section';

export function buildItineraryUserPrompt(
  context: TripPlanningContext,
  places: AIPlacesContext,
): string {
  return `
Plan a complete trip using the following information.

Destination
Name: ${context.destination.name}
City: ${context.destination.city ?? 'Unknown'}
State: ${context.destination.state ?? 'Unknown'}
Country: ${context.destination.country}
Coordinates
Latitude: ${context.destination.latitude}
Longitude: ${context.destination.longitude}

Trip
Start Date: ${context.trip.startDate}
End Date: ${context.trip.endDate}
Travellers: ${context.trip.travellers}
Arrival Timing: ${context.trip.arrivalTime ? `Arriving on ${context.trip.arrivalDate ?? context.trip.startDate} at ${context.trip.arrivalTime}` : 'Morning / Flexible'}
Departure Timing: ${context.trip.departureTime ? `Departing on ${context.trip.departureDate ?? context.trip.endDate} at ${context.trip.departureTime}` : 'Evening / Flexible'}

Budget Style
${context.preferences.budgetStyle}

Travel Style
${context.preferences.travelStyle}

Travel Pace
${context.preferences.tripPace}

Companions: ${context.preferences.companions ?? 'Friends / Mixed group'}
Transportation Mode: ${context.preferences.transportMode ?? 'Mixed / Flexible'}
Accommodation Base: ${
  context.preferences.accommodationType === 'booked'
    ? `Already booked at: ${context.preferences.hotelLocationOrStyle ?? 'Specified hotel'}. Anchor daily mornings and evenings here!`
    : context.preferences.hotelLocationOrStyle
    ? `Need hotel recommendation matching: ${context.preferences.hotelLocationOrStyle}`
    : 'Standard hotel / flexible'
}
Dietary Preference: ${context.preferences.dietary ?? 'No restrictions'}

Interests
${context.preferences.interests.join(', ')}

Additional Notes
${context.notes ?? 'None'}
${buildPlacesSection(places)}
`;
}
