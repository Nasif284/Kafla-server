import { inject, injectable } from 'tsyringe';

import { IJoinCallUseCase } from '../../interfaces/use-cases/calls/join-call.interface';
import { IJoinGroupCallUseCase } from '../../interfaces/use-cases/calls/join-group-call.interface';
import { TOKENS } from '../../../infrastructure/di/tokens';
import { CallDTO } from '../../dtos/call/request/call.dto';

@injectable()
export class JoinCallUseCase implements IJoinCallUseCase {
  constructor(
    @inject(TOKENS.IJoinGroupCallUseCase)
    private readonly joinGroupCallUseCase: IJoinGroupCallUseCase,
  ) {}

  async execute(callId: string, userId: string): Promise<CallDTO> {
    return this.joinGroupCallUseCase.execute(callId, userId);
  }
}
