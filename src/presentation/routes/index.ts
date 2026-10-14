import { Router } from 'express';
import { TripHQContainer } from '../../infrastructure/di/container';
import { buildAuthRoutes } from './user/auth/auth.route';
import { buildOnboardingRoutes } from './user/onboarding/onboarding.route';
import { buildTripGroupRoutes } from './trip/group/group.route';
import { buildChatRoutes } from './user/chat/chat.route';
import { buildCallRoutes } from './user/calls/call.route';
import { HttpStatus } from '../../domain/enums/HttpStatusCodes.constants';

export function buildRoutes(container: TripHQContainer): Router {
  const router = Router();
  const userAuth = container.userAuthMiddleware;

  router.use('/auth', buildAuthRoutes(container.authController, userAuth));
  router.use('/onboarding', buildOnboardingRoutes(container.onboardingController, userAuth));
  router.use('/trips/groups', buildTripGroupRoutes(container.tripControllers, userAuth));
  router.use('/chat', buildChatRoutes(container.chatController, userAuth));
  router.use('/calls', buildCallRoutes(container.callController, userAuth));

  router.get('/health', (_req, res) => {
    res.status(HttpStatus.OK).json({ status: 'ok', service: 'Kafla Server' });
  });

  return router;
}
