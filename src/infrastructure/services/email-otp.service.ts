import { OtpPurpose } from '../../domain/enums/user.constants';
import { IOtpService } from '../../application/interfaces/services/otp.service.interface';
import { IHashService } from '../../application/interfaces/services/hash.service.interface';
import { IEmailService } from '../../application/interfaces/services/email.service.interface';
import {
  InvalidOtpError,
  OtpMaxAttemptsError,
  OtpNotFoundError,
} from '../../domain/errors/auth.error';
import { config } from '../../config/env.config';
import { inject, injectable } from 'tsyringe';
import { TOKENS } from '../di/tokens';
import { ICacheService } from '../../application/interfaces/services/cache.service.interface';

interface OtpRedisValue {
  codeHash: string;
  attempts: number;
}

export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

@injectable()
export class RedisOtpService implements IOtpService {
  private readonly _expirySeconds: number;
  private readonly _maxAttempts: number;

  constructor(
    @inject(TOKENS.ICacheService) private readonly _cache: ICacheService,
    @inject(TOKENS.IHashService) private readonly _hashService: IHashService,
    @inject(TOKENS.IEmailService) private readonly _emailService: IEmailService,
  ) {
    this._expirySeconds = parseInt(config.otp.expiryInMinutes ?? '10') * 60;
    this._maxAttempts = parseInt(config.otp.maxAttempts ?? '3');
  }

  private _key(email: string, purpose: OtpPurpose): string {
    return `otp:${purpose}:${email}`;
  }

  async send(email: string, purpose: OtpPurpose): Promise<void> {
    const code = generateCode();
    const codeHash = await this._hashService.hash(code);

    const value: OtpRedisValue = { codeHash, attempts: 0 };

    await this._cache.set(
      this._key(email, purpose),
      this._expirySeconds,
      JSON.stringify(value),
    );

    await this._emailService.sendOtp(email, code);
  }

  async verify(
    email: string,
    code: string,
    purpose: OtpPurpose,
  ): Promise<void> {
    const key = this._key(email, purpose);
    const raw = await this._cache.get(key);

    if (!raw) {
      throw new OtpNotFoundError();
    }

    const value: OtpRedisValue = JSON.parse(raw);

    if (value.attempts >= this._maxAttempts) {
      await this._cache.delete(key);
      throw new OtpMaxAttemptsError();
    }

    const isValid = await this._hashService.compare(code, value.codeHash);

    if (!isValid) {
      value.attempts += 1;
      const ttl = await this._cache.ttl(key);
      if (ttl > 0) {
        await this._cache.set(key, ttl, JSON.stringify(value));
      }
      throw new InvalidOtpError();
    }

    await this._cache.delete(key);
  }
}
