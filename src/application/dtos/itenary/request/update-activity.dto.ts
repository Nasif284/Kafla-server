import { ActivityCategory } from '../../../../domain/enums';

export interface UpdateItineraryActivityRequestDTO {
  activityId: string;
  title?: string;
  description?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  categoryCode?: ActivityCategory;
  startTime?: string;
  durationMinutes?: number;
  notes?: string;
}
