import { ChecklistCategory, ChecklistPriority } from '../../../../domain/enums';

export interface AddTaskToChecklistRequestDTO {
  title: string;
  groupId: string;
  categoryCode: ChecklistCategory;
  priorityCode: ChecklistPriority;
  assignedTo: string;
  createdBy: string;
  notes?: string;
}
