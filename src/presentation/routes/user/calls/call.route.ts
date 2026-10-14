import { Router } from 'express';

import { CallController } from '../../../controllers/user/call/call.controller';
import { UserAuthMiddleware } from '../../../middleware/user/auth/userAuth.middleware';
import { asyncHandler } from '../../../middleware/error/asyncHandler';

export function buildCallRoutes(
  controller: CallController,
  auth: UserAuthMiddleware,
): Router {
  const router = Router();

  router.post(
    '/group',
    auth.authenticate,
    asyncHandler(controller.createGroupCall),
  );

  router.post(
    '/:callId/join',
    auth.authenticate,
    asyncHandler(controller.joinCall),
  );

  router.post(
    '/:callId/leave',
    auth.authenticate,
    asyncHandler(controller.leaveCall),
  );

  return router;
}
