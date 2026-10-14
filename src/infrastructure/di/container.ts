import { container } from 'tsyringe';
import { registerDependencies } from './dependency-regestration';
import { PrismaClient } from '@prisma/client';
import { Server } from 'socket.io';
import { Redis } from 'ioredis';

import { TripController } from '../../presentation/controllers/trip/trip.controller';
import { ChecklistController } from '../../presentation/controllers/trip/checklist/checklist.controller';
import { ExpenseController } from '../../presentation/controllers/trip/expense/expense.controller';
import { ItineraryController } from '../../presentation/controllers/trip/Itenerary/Itinerary.controller';
import { ChatController } from '../../presentation/controllers/user/chat/chat.controller';
import { CallController } from '../../presentation/controllers/user/call/call.controller';
import { UserAuthMiddleware } from '../../presentation/middleware/user/auth/userAuth.middleware';
import { AuthController } from '../../presentation/controllers/user/auth/auth.controller';
import { OnboardingController } from '../../presentation/controllers/user/onboarding/onboarding.controller';

export interface TripHQContainer {
  tripControllers: TripControllers;
  chatController: ChatController;
  callController: CallController;
  userAuthMiddleware: UserAuthMiddleware;
  authController: AuthController;
  onboardingController: OnboardingController;
}

export interface TripControllers {
  tripController: TripController;
  checklistController: ChecklistController;
  expenseController: ExpenseController;
  itineraryController: ItineraryController;
}

export function buildContainer(
  db: PrismaClient,
  redis: Redis,
  io: Server,
): TripHQContainer {
  registerDependencies(db, redis, io);

  const tripController = container.resolve(TripController);
  const checklistController = container.resolve(ChecklistController);
  const expenseController = container.resolve(ExpenseController);
  const itineraryController = container.resolve(ItineraryController);
  const chatController = container.resolve(ChatController);
  const callController = container.resolve(CallController);
  const userAuthMiddleware = container.resolve(UserAuthMiddleware);
  const authController = container.resolve(AuthController);
  const onboardingController = container.resolve(OnboardingController);

  return {
    tripControllers: {
      tripController,
      checklistController,
      expenseController,
      itineraryController,
    },
    chatController,
    callController,
    userAuthMiddleware,
    authController,
    onboardingController,
  };
}
