import { Router } from 'express';
import { ItineraryController } from '../../../../controllers/trip/Itenerary/Itinerary.controller';
import { UserAuthMiddleware } from '../../../../middleware/user/auth/userAuth.middleware';
import { asyncHandler } from '../../../../middleware/error/asyncHandler';

export function buildItineraryRoutes(
  controller: ItineraryController,
  userAuth: UserAuthMiddleware,
): Router {
  const router = Router({ mergeParams: true });

  router.post(
    '/setup',
    userAuth.authenticate,
    asyncHandler(controller.setupItinerary),
  );
  router.get(
    '/',
    userAuth.authenticate,
    asyncHandler(controller.getGroupItinerary),
  );
  router.post(
    '/',
    userAuth.authenticate,
    asyncHandler(controller.saveGenerated),
  );
  router.post(
    '/day',
    userAuth.authenticate,
    asyncHandler(controller.createItineraryDay),
  );
  router.post(
    '/swap-days',
    userAuth.authenticate,
    asyncHandler(controller.swapDays),
  );

  router.post(
    '/ai/generate',
    userAuth.authenticate,
    asyncHandler(controller.generateAiItinerary),
  );
  router.post(
    '/ai/swap-activity',
    userAuth.authenticate,
    asyncHandler(controller.swapActivity),
  );
  router.post(
    '/ai/regenerate-day',
    userAuth.authenticate,
    asyncHandler(controller.regenerateDay),
  );
  router.patch(
    '/days/:dayId',
    userAuth.authenticate,
    asyncHandler(controller.updateItineraryDay),
  );
  router.delete(
    '/days/:dayId',
    userAuth.authenticate,
    asyncHandler(controller.deleteItineraryDay),
  );

  router.post(
    '/days/:dayId/activities',
    userAuth.authenticate,
    asyncHandler(controller.createActivity),
  );
  router.patch(
    '/days/:dayId/activities/:activityId',
    userAuth.authenticate,
    asyncHandler(controller.updateActivity),
  );
  router.patch(
    '/days/:dayId/activities/:activityId/completion',
    userAuth.authenticate,
    asyncHandler(controller.toggleActivityCompletion),
  );
  router.delete(
    '/days/:dayId/activities/:activityId',
    userAuth.authenticate,
    asyncHandler(controller.deleteActivity),
  );

  return router;
}
