import 'reflect-metadata';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { Server } from 'socket.io';
import { Redis } from 'ioredis';

import { TOKENS } from './tokens';

import { UserRepository } from '../database/repositories/user.repository';
import { TripGroupRepository } from '../database/repositories/trip-group.repository';
import { GroupMemberRepository } from '../database/repositories/group-member.repository';
import { ChecklistRepository } from '../database/repositories/checklist.repository';
import { ExpenseRepository } from '../database/repositories/expense.repository';
import { ItineraryRepository } from '../database/repositories/itenary.repository';
import { ChatRepository } from '../database/repositories/chat.repository';
import { CallRepository } from '../database/repositories/call.repository';

import { BcryptHashService } from '../services/bcrypt-hash.service';
import { JwtTokenService } from '../services/token.service';
import { EmailService } from '../services/email.service';
import { ImageService } from '../services/image.service';
import { GooglePlacesClient } from '../services/google-places-client.service';
import { GooglePlacesService } from '../services/google-places.service';
import { OpenMeteoWeatherService } from '../services/open-mateo-weather.service';
import { OpenRouterAIModelService } from '../services/open-router-ai-model.service';
import { GeminiAIModelService } from '../services/gemini-ai-model.service';
import { IAIModelService } from '../../application/interfaces/services/ai-model.service.interface';
import { AiItineraryService } from '../services/ai-itinerary.service';
import { StorageService } from '../services/storage.service';
import { CallNotificationService } from '../services/call-notification.service';
import { PresenceService } from '../services/presence.service';

import { UserAuthMiddleware } from '../../presentation/middleware/user/auth/userAuth.middleware';

import { registerTripDependency } from './group/trip.dependency';
import { registerChecklistDependency } from './checklist/checklist.dependency';
import { registerExpenseDependency } from './expense/dependency';
import { registerItineraryDependencies } from './itinerary/dependency';
import { registerChatsDependency } from './chat/dependency';
import { registerCallDependency } from './call/dependency';
import { registerAuthDependencies } from './auth/auth.dependency';

export function registerDependencies(
  db: PrismaClient,
  redis: Redis,
  io: Server,
): void {
  container.registerInstance<PrismaClient>(TOKENS.PrismaClient, db);
  container.registerInstance<Redis>(TOKENS.RedisClient, redis);
  container.registerInstance<Server>(TOKENS.Socket, io);

  container.registerSingleton<BcryptHashService>(
    TOKENS.IHashService,
    BcryptHashService,
  );
  container.registerSingleton<JwtTokenService>(
    TOKENS.ITokenService,
    JwtTokenService,
  );
  container.registerSingleton<EmailService>(
    TOKENS.IEmailService,
    EmailService,
  );
  container.registerSingleton<ImageService>(
    TOKENS.IImageService,
    ImageService,
  );
  container.registerSingleton<GooglePlacesClient>(
    TOKENS.GooglePlacesClient,
    GooglePlacesClient,
  );
  container.registerSingleton<GooglePlacesService>(
    TOKENS.IPlacesService,
    GooglePlacesService,
  );
  container.registerSingleton<OpenMeteoWeatherService>(
    TOKENS.IWeatherService,
    OpenMeteoWeatherService,
  );
  container.registerSingleton<OpenRouterAIModelService>(
    TOKENS.OpenRouterAIModelService,
    OpenRouterAIModelService,
  );
  container.registerSingleton<GeminiAIModelService>(
    TOKENS.GeminiAIModelService,
    GeminiAIModelService,
  );

  // Injected as active IAIModelService:
  // Defaults to GeminiAIModelService as requested. Switchable via AI_PROVIDER in .env ('gemini' | 'openrouter'):
  const configuredProvider = (process.env.AI_PROVIDER || 'gemini').toLowerCase();
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);

  let activeAiProvider: 'gemini' | 'openrouter' = 'gemini';
  if (configuredProvider === 'openrouter') {
    activeAiProvider = 'openrouter';
  } else if (!hasGeminiKey && process.env.OPENROUTER_API_KEY) {
    console.warn(
      '[DependencyInjection] ℹ️ GEMINI_API_KEY is not set yet in .env. Falling back to OpenRouter until GEMINI_API_KEY is provided.',
    );
    activeAiProvider = 'openrouter';
  } else {
    activeAiProvider = 'gemini';
  }

  if (activeAiProvider === 'openrouter') {
    container.registerSingleton<IAIModelService>(
      TOKENS.IAIModelService,
      OpenRouterAIModelService,
    );
  } else {
    container.registerSingleton<IAIModelService>(
      TOKENS.IAIModelService,
      GeminiAIModelService,
    );
  }
  container.registerSingleton<AiItineraryService>(
    TOKENS.IAiItineraryService,
    AiItineraryService,
  );
  container.registerSingleton<StorageService>(
    TOKENS.IStorageService,
    StorageService,
  );
  container.registerSingleton<CallNotificationService>(
    TOKENS.ICallNotificationService,
    CallNotificationService,
  );
  container.registerSingleton<PresenceService>(
    TOKENS.IPresenceService,
    PresenceService,
  );

  container.registerSingleton<UserRepository>(
    TOKENS.IUserRepository,
    UserRepository,
  );
  container.registerSingleton<TripGroupRepository>(
    TOKENS.ITripGroupRepository,
    TripGroupRepository,
  );
  container.registerSingleton<GroupMemberRepository>(
    TOKENS.IGroupMemberRepository,
    GroupMemberRepository,
  );
  container.registerSingleton<ChecklistRepository>(
    TOKENS.IChecklistRepository,
    ChecklistRepository,
  );
  container.registerSingleton<ExpenseRepository>(
    TOKENS.IExpenseRepository,
    ExpenseRepository,
  );
  container.registerSingleton<ItineraryRepository>(
    TOKENS.IItineraryRepository,
    ItineraryRepository,
  );
  container.registerSingleton<ChatRepository>(
    TOKENS.IChatRepository,
    ChatRepository,
  );
  container.registerSingleton<CallRepository>(
    TOKENS.ICallRepository,
    CallRepository,
  );

  container.registerSingleton<UserAuthMiddleware>(
    TOKENS.UserAuthMiddleware,
    UserAuthMiddleware,
  );

  registerTripDependency();
  registerChecklistDependency();
  registerExpenseDependency();
  registerItineraryDependencies();
  registerChatsDependency();
  registerCallDependency();
  registerAuthDependencies();
}
