import {
  ExpenseCategory,
  ExpenseSplitMethod,
  ExpenseActivityType,
} from '../../enums';

export interface ExpenseShareEntity {
  id: string;
  expenseId: string;
  memberId: string;
  paidById: string;
  amount: number | string;
  percentage?: number | string | null;
  shares?: number | string | null;
  createdAt: Date;
}

export interface ExpenseEntity {
  id: string;
  groupId: string;
  title: string;
  description?: string | null;
  amount: number | string;
  expenseDate: Date;
  categoryCode: ExpenseCategory;
  splitMethodCode: ExpenseSplitMethod;
  paidById: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  shares?: ExpenseShareEntity[];
}

export interface ExpenseSettlementEntity {
  id: string;
  groupId: string;
  payerMemberId: string;
  receiverMemberId: string;
  amount: number | string;
  note?: string | null;
  settledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpenseActivityEntity {
  id: string;
  expenseId: string;
  userId: string;
  actionCode: ExpenseActivityType;
  message?: string | null;
  createdAt: Date;
}
