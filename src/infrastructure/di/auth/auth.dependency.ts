import 'reflect-metadata';
import { container } from 'tsyringe';
import { TOKENS } from '../tokens';

import { Register } from '../../../application/use-cases/auth/user/register.usecase';
import { EmailVerification } from '../../../application/use-cases/auth/user/verify-email.usecase';
import { LoginUseCase } from '../../../application/use-cases/auth/user/login.usecase';
import { ForgotPassword } from '../../../application/use-cases/auth/user/forgot-password.usecase';
import { ResetPassword } from '../../../application/use-cases/auth/user/reset-password.usecase';
import { RefreshToken } from '../../../application/use-cases/auth/user/refresh-tokem.usecase';
import { SendOtp } from '../../../application/use-cases/auth/user/send-otp.usecase';
import { Logout } from '../../../application/use-cases/auth/user/logout.usecase';
import { VerifyOtp } from '../../../application/use-cases/auth/user/otp-verify.usecase';
import { GoogleAuth } from '../../../application/use-cases/auth/user/google-auth.usecase';
import { AuthMe } from '../../../application/use-cases/auth/user/auth-me.usecase';
import { OnboardingSource } from '../../../application/use-cases/onboarding/onboarding-source.usecase';

import { RedisCacheService } from '../../services/redis-cache.service';
import { RedisSessionService } from '../../services/session.service';
import { RedisOtpService } from '../../services/email-otp.service';

export function registerAuthDependencies(): void {
  container.registerSingleton(TOKENS.ICacheService, RedisCacheService);
  container.registerSingleton(TOKENS.ISessionService, RedisSessionService);
  container.registerSingleton(TOKENS.IOtpService, RedisOtpService);

  container.registerSingleton(TOKENS.IRegister, Register);
  container.registerSingleton(TOKENS.IVerifyEmail, EmailVerification);
  container.registerSingleton(TOKENS.ILogin, LoginUseCase);
  container.registerSingleton(TOKENS.IForgotPassword, ForgotPassword);
  container.registerSingleton(TOKENS.IResetPassword, ResetPassword);
  container.registerSingleton(TOKENS.IRefreshToken, RefreshToken);
  container.registerSingleton(TOKENS.ISendOtp, SendOtp);
  container.registerSingleton(TOKENS.ILogout, Logout);
  container.registerSingleton(TOKENS.IVerifyOtp, VerifyOtp);
  container.registerSingleton(TOKENS.IGoogleAuth, GoogleAuth);
  container.registerSingleton(TOKENS.IAuthMe, AuthMe);
  container.registerSingleton(TOKENS.IOnboardingSource, OnboardingSource);
}
