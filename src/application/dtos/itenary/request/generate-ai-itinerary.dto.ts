export interface GenerateAiItineraryRequestDTO {
  groupId: string;
  tripPace: string;
  interests: string[];
  notes?: string;
  arrivalDate?: string;
  arrivalTime?: string;
  departureDate?: string;
  departureTime?: string;
  companions?: string;
  transportMode?: string;
  accommodationType?: string;
  hotelLocationOrStyle?: string;
  dietary?: string;
}
