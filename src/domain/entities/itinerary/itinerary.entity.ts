import { ActivityCategory } from '../../enums';

export interface ItineraryActivityEntity {
  id: string;
  dayId: string;
  title: string;
  description?: string | null;
  location: string;
  latitude?: number | string | null;
  longitude?: number | string | null;
  categoryCode: ActivityCategory;
  startTime: string;
  durationMinutes: number;
  notes?: string | null;
  sortOrder: number;
  isCompleted: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItineraryDayEntity {
  id: string;
  groupId: string;
  date: Date;
  location?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  summary?: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  activities?: ItineraryActivityEntity[];
}
