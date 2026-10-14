import {
  ChecklistCategory,
  ChecklistPriority,
  ChecklistActivityType,
} from '../../enums';

export interface ChecklistItemEntity {
  id: string;
  groupId: string;
  categoryCode: ChecklistCategory;
  title: string;
  notes?: string | null;
  priorityCode: ChecklistPriority;
  isCompleted: boolean;
  assignedTo?: string | null;
  createdBy: string;
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistActivityEntity {
  id: string;
  itemId: string;
  userId: string;
  actionCode: ChecklistActivityType;
  message?: string | null;
  createdAt: Date;
}
