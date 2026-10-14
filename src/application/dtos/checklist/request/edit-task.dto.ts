import { ChecklistCategory, ChecklistPriority } from '../../../../domain/enums';

export interface EditChecklistTaskRequestDTO {
  id: string;
  title: string;
  categoryCode: ChecklistCategory;
  priorityCode: ChecklistPriority;
  assignedTo: string;
  notes?: string;
}
