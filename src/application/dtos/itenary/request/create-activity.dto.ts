import { ActivityCategory } from '../../../../domain/enums';

export interface CreateItineraryActivityRequestDTO {
  groupId: string;
  dayId: string;
  userId: string;
  title: string;
  description?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  categoryCode: ActivityCategory;
  startTime?: string;
  durationMinutes?: number;
  notes?: string;
}
