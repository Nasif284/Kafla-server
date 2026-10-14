import { OtpPurpose } from '../../../domain/enums/user.constants';

export interface IOtpService {
  send(email: string, purpose: OtpPurpose): Promise<void>;
  verify(email: string, code: string, purpose: OtpPurpose): Promise<void>;
}
