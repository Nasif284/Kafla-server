export interface DestinationContext {
  placeId: string;
  name: string;
  city: string | null;
  state: string | null;
  country: string;
  latitude: number;
  longitude: number;
}

export interface TripContext {
  startDate: string;
  endDate: string;
  travellers: number;
  arrivalDate?: string;
  arrivalTime?: string;
  departureDate?: string;
  departureTime?: string;
}

export interface PreferenceContext {
  tripPace: string;
  budgetStyle: string;
  travelStyle: string;
  interests: string[];
  companions?: string;
  transportMode?: string;
  accommodationType?: string;
  hotelLocationOrStyle?: string;
  dietary?: string;
}

export interface TripPlanningContext {
  destination: DestinationContext;
  trip: TripContext;
  preferences: PreferenceContext;
  notes?: string;
}
