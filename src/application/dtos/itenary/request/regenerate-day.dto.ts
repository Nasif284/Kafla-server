export interface RegenerateDayRequestDTO {
  groupId: string;
  destination: string;
  dayNumber: number;
  date: string;
  startFromLocation?: string;
  endAtLocation?: string;
  excludePlaces: string[];
  tripPace?: string;
  interests?: string[];
  companions?: string;
  transportMode?: string;
  accommodationType?: string;
  hotelLocationOrStyle?: string;
  dietary?: string;
  notes?: string;
  customInstruction?: string;
}
