import { ExpenseCategory, ExpenseSplitMethod } from '../../../../domain/enums';

export interface ExpenseParticipantDTO {
  memberId: string;
  percentage?: number;
  amount?: number;
  shares?: number;
}

export interface CreateExpenseRequestDTO {
  groupId: string;
  title: string;
  description?: string;
  amount: number;
  expenseDate?: Date;
  categoryCode: ExpenseCategory;
  splitMethodCode: ExpenseSplitMethod;
  paidById: string;
  createdBy: string;
  participants: ExpenseParticipantDTO[];
}
