export interface SwapActivityRequestDTO {
  groupId: string;
  destination: string;
  dayDate: string;
  currentActivity: {
    title: string;
    category?: string;
    startTime?: string;
    durationMinutes?: number;
    location?: string;
  };
  previousActivity?: {
    title: string;
    category?: string;
    startTime?: string;
    durationMinutes?: number;
    location?: string;
  };
  nextActivity?: {
    title: string;
    category?: string;
    startTime?: string;
    durationMinutes?: number;
    location?: string;
  };
  dayActivitiesOutline?: string[];
  excludePlaces: string[];
  interests?: string[];
  tripPace?: string;
  dietary?: string;
  customInstruction?: string;
}
