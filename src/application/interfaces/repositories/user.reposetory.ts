import { User } from '../../../domain/entities/user/user.entity';

export interface CreateUserData {
  fullName: string;
  email: string;
  passwordHash?: string;
  isEmailVerified?: boolean;
}

export interface IUserRepository {
  findUserById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  createUser(data: CreateUserData): Promise<User>;
  updateUser(userId: string, payload: Partial<User>): Promise<void>;
  updatePassword(userId: string, passwordHash: string): Promise<void>;
  updateEmailVerified(email: string): Promise<void>;
  addUserOnboardingSource(payload: { source: string; userId: string }): Promise<void>;
  updateOnboarding(
    userId: string,
    payload: Partial<{
      onboardingStep: number;
      onboardingCompleted: boolean;
      onboardingSourceCode: string;
    }>,
  ): Promise<void>;
  findMany(ids: string[]): Promise<User[]>;
}
