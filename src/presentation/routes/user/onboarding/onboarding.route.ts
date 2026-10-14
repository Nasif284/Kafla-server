import { Router } from 'express';
import { OnboardingController } from '../../../controllers/user/onboarding/onboarding.controller';
import { UserAuthMiddleware } from '../../../middleware/user/auth/userAuth.middleware';
import { validate } from '../../../validators/validator';
import { onboardingSourceSchema } from '../../../validators/user/onboarding/source.validator';
import { asyncHandler } from '../../../middleware/error/asyncHandler';

export function buildOnboardingRoutes(
  controller: OnboardingController,
  userAuth: UserAuthMiddleware,
): Router {
  const router = Router();
  router.post(
    '/source',
    userAuth.authenticate,
    validate(onboardingSourceSchema),
    asyncHandler(controller.addOnboardingSource),
  );
  return router;
}
