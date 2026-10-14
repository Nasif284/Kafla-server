import { AccountStatus } from '../../enums';

export interface UserOnboardingEntity {
  userId?: string;
  onboardingStep?: number;
  onboardingCompleted?: boolean;
  onboardingSourceCode?: string | null;
  completedAt?: Date | null;
  createdAt?: Date;
}

export interface UserEntity {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  passwordHash?: string | null;
  avatarUrl?: string | null;
  isEmailVerified: boolean;
  emailVerifiedAt?: Date | null;
  accountStatusCode: AccountStatus;
  createdAt: Date;
  updatedAt: Date;
  onboarding?: UserOnboardingEntity | null;
}

export type User = UserEntity;
