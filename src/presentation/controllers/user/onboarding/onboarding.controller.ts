import { inject, injectable } from 'tsyringe';
import { TOKENS } from '../../../../infrastructure/di/tokens';
import { IOnboardingSource } from '../../../../application/interfaces/use-cases/onboarding/onboarding-source.interface';
import { Request, Response } from 'express';
import { UserNotFoundError } from '../../../../domain/errors/auth.error';
import { HttpStatus } from '../../../../domain/enums/HttpStatusCodes.constants';
import { ApiResponse } from '../../../responses/common-response';
import { ONBOARDING_MESSAGES } from '../../../../shared/constants/messages/success/user/onboarding.messages';

@injectable()
export class OnboardingController {
  constructor(
    @inject(TOKENS.IOnboardingSource)
    private readonly _onboardingSourceUseCase: IOnboardingSource,
  ) {}

  addOnboardingSource = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const source = req.body.source;
    const userId = req.user?.userId;
    if (!userId) {
      throw new UserNotFoundError();
    }
    await this._onboardingSourceUseCase.execute({ source, userId });
    return res
      .status(HttpStatus.CREATED)
      .json(ApiResponse.success(ONBOARDING_MESSAGES.SOURCE_ADDED));
  };
}
