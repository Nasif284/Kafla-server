import { inject, injectable } from "tsyringe";
import { IAuthMe } from "../../../interfaces/use-cases/auth/user/auth-me.interface";
import { TOKENS } from "../../../../infrastructure/di/tokens";
import { IUserRepository } from "../../../interfaces/repositories/user.reposetory";
import { UnauthorizedError } from "../../../../domain/errors/auth.error";
import { IStorageService } from "../../../interfaces/services/storage.service.interface";
import { AuthResponseDTO } from "../../../dtos/auth/user/responce/login.dto";
@injectable()
export class AuthMe implements IAuthMe {
  constructor(
    @inject(TOKENS.IUserRepository)
    private readonly _userRepository: IUserRepository,
    @inject(TOKENS.IStorageService)
    private readonly _storageService: IStorageService,
  ) {}
  async execute(dto: { userId: string }): Promise<AuthResponseDTO> {
    const user = await this._userRepository.findUserById(dto.userId);
    if (!user) throw new UnauthorizedError();
    return {
      response: {
        isVerified: user.isEmailVerified,
        onboardingCompleted: user.onboarding?.onboardingCompleted ?? false,
        onboardingStep: user.onboarding?.onboardingStep ?? 1,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          avatarUrl: user.avatarUrl,
        },
      },
    };
  }
}
