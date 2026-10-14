import { inject, injectable } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { TOKENS } from "../../di/tokens";
import { BaseRepository } from "./base.repository";
import { User } from "../../../domain/entities/user/user.entity";
import { CreateUserData, IUserRepository } from "../../../application/interfaces/repositories/user.reposetory";

@injectable()
export class UserRepository extends BaseRepository<User, CreateUserData, Partial<CreateUserData>> implements IUserRepository {
  constructor(
    @inject(TOKENS.PrismaClient)
    protected override readonly prisma: PrismaClient,
  ) {
    super(prisma, prisma.user);
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user as User | null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user as User | null;
  }

  async createUser(data: CreateUserData): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        passwordHash: data.passwordHash,
      },
    });
    return user as User;
  }

  async updateUser(userId: string, payload: Partial<User>): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: payload as any,
    });
  }

  async updatePassword(userId: string, passwordHash: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });
  }

  async updateEmailVerified(email: string): Promise<void> {
    await this.prisma.user.update({
      where: { email },
      data: {
        isEmailVerified: true,
        emailVerifiedAt: new Date(),
      },
    });
  }

  async addUserOnboardingSource(payload: { source: string; userId: string }): Promise<void> {
    await this.prisma.userOnboardingSource.upsert({
      where: { userId: payload.userId },
      create: {
        userId: payload.userId,
        onboardingSourceCode: payload.source,
      },
      update: {
        onboardingSourceCode: payload.source,
      },
    });
  }

  async updateOnboarding(
    userId: string,
    payload: Partial<{
      onboardingStep: number;
      onboardingCompleted: boolean;
      onboardingSourceCode: string;
    }>,
  ): Promise<void> {
    await this.prisma.userOnboardingSource.upsert({
      where: { userId },
      create: {
        userId,
        onboardingSourceCode: payload.onboardingSourceCode,
      },
      update: {
        onboardingSourceCode: payload.onboardingSourceCode,
      },
    });
  }

  async findMany(ids: string[]): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        id: { in: ids },
      },
    });
    return users as User[];
  }
}
