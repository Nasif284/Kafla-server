import { CHECKLIST_TOKENS } from './checklist/checklist.tokens';
import { EXPENSE_TOKENS } from './expense/tokens';
import { TRIP_TOKENS } from './group/tokens';
import { ITINERARY_TOKENS } from './itinerary/tokens';
import { CHAT_TOKENS } from './chat/tokens';
import { CALL_TOKENS } from './call/tokens';

export const AUTH_TOKENS = {
  IRegister: 'IRegister',
  IVerifyEmail: 'IVerifyEmail',
  ILogin: 'ILogin',
  IForgotPassword: 'IForgotPassword',
  IResetPassword: 'IResetPassword',
  IRefreshToken: 'IRefreshToken',
  ISendOtp: 'ISendOtp',
  ILogout: 'ILogout',
  IVerifyOtp: 'IVerifyOtp',
  IGoogleAuth: 'IGoogleAuth',
  IAuthMe: 'IAuthMe',
  IOnboardingSource: 'IOnboardingSource',
  ICacheService: 'ICacheService',
  ISessionService: 'ISessionService',
  IOtpService: 'IOtpService',
  IGoogleAuthService: 'IGoogleAuthService',
} as const;

export const TOKENS = {
  IUserRepository: 'IUserRepository',
  IChecklistRepository: 'IChecklistRepository',
  IExpenseRepository: 'IExpenseRepository',
  IItineraryRepository: 'IItineraryRepository',
  IChatRepository: 'IChatRepository',
  ICallRepository: 'ICallRepository',

  UserAuthMiddleware: 'UserAuthMiddleware',

  IHashService: 'IHashService',
  ITokenService: 'ITokenService',
  IEmailService: 'IEmailService',
  IStorageService: 'IStorageService',
  IImageService: 'IImageService',
  IWeatherService: 'IWeatherService',
  IAIModelService: 'IAIModelService',
  OpenRouterAIModelService: 'OpenRouterAIModelService',
  GeminiAIModelService: 'GeminiAIModelService',
  IPlacesService: 'IPlacesService',
  IAiItineraryService: 'IAiItineraryService',
  GooglePlacesClient: 'GooglePlacesClient',
  ICallNotificationService: 'ICallNotificationService',
  IPresenceService: 'IPresenceService',

  PrismaClient: 'PrismaClient',
  RedisClient: 'RedisClient',
  Socket: 'Socket',

  ...AUTH_TOKENS,
  ...TRIP_TOKENS,
  ...CHECKLIST_TOKENS,
  ...EXPENSE_TOKENS,
  ...ITINERARY_TOKENS,
  ...CHAT_TOKENS,
  ...CALL_TOKENS,
} as const;
