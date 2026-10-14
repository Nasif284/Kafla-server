import { container } from 'tsyringe';
import { TOKENS } from '../tokens';
import { ICreateGroupCallUseCase } from '../../../application/interfaces/use-cases/calls/create-group-call.interface';
import { CreateGroupCallUseCase } from '../../../application/use-cases/calls/create-group-call.usecase';
import { IJoinGroupCallUseCase } from '../../../application/interfaces/use-cases/calls/join-group-call.interface';
import { JoinGroupCallUseCase } from '../../../application/use-cases/calls/join-group-call.use-case';
import { IJoinCallUseCase } from '../../../application/interfaces/use-cases/calls/join-call.interface';
import { JoinCallUseCase } from '../../../application/use-cases/calls/join-call.usecase';
import { ILeaveCallUseCase } from '../../../application/interfaces/use-cases/calls/leave-call.interface';
import { LeaveCallUseCase } from '../../../application/use-cases/calls/leave-call.usecase';
import { IAuthorizeSignalingUseCase } from '../../../application/interfaces/use-cases/calls/authorize-signaling.interface';
import { AuthorizeSignalingUseCase } from '../../../application/use-cases/calls/authorize-signaling.usecase';

export function registerCallDependency() {
  container.registerSingleton<ICreateGroupCallUseCase>(
    TOKENS.ICreateGroupCallUseCase,
    CreateGroupCallUseCase,
  );
  container.registerSingleton<IJoinGroupCallUseCase>(
    TOKENS.IJoinGroupCallUseCase,
    JoinGroupCallUseCase,
  );
  container.registerSingleton<IJoinCallUseCase>(
    TOKENS.IJoinCallUseCase,
    JoinCallUseCase,
  );
  container.registerSingleton<ILeaveCallUseCase>(
    TOKENS.ILeaveCallUseCase,
    LeaveCallUseCase,
  );
  container.registerSingleton<IAuthorizeSignalingUseCase>(
    TOKENS.IAuthorizeSignalingUseCase,
    AuthorizeSignalingUseCase,
  );
}
