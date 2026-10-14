import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import { TOKENS } from '../../../../infrastructure/di/tokens';
import { ICreateGroupCallUseCase } from '../../../../application/interfaces/use-cases/calls/create-group-call.interface';
import { IJoinCallUseCase } from '../../../../application/interfaces/use-cases/calls/join-call.interface';
import { ILeaveCallUseCase } from '../../../../application/interfaces/use-cases/calls/leave-call.interface';

import { ApiResponse } from '../../../responses/common-response';
import { HttpStatus } from '../../../../domain/enums/HttpStatusCodes.constants';

@injectable()
export class CallController {
  constructor(
    @inject(TOKENS.ICreateGroupCallUseCase)
    private readonly createGroupCallUseCase: ICreateGroupCallUseCase,

    @inject(TOKENS.IJoinCallUseCase)
    private readonly joinCallUseCase: IJoinCallUseCase,

    @inject(TOKENS.ILeaveCallUseCase)
    private readonly leaveCallUseCase: ILeaveCallUseCase,
  ) {}

  createGroupCall = async (req: Request, res: Response): Promise<Response> => {
    const callerId = req.user!.userId;
    const { tripGroupId, mediaType } = req.body;
    const call = await this.createGroupCallUseCase.execute(callerId, {
      tripGroupId,
      mediaType,
    });
    return res
      .status(HttpStatus.CREATED)
      .json(ApiResponse.success('Group call created successfully.', { call }));
  };

  joinCall = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user!.userId;
    const { callId } = req.params;
    const call = await this.joinCallUseCase.execute(callId as string, userId);
    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success('Joined call successfully.', { call }));
  };

  leaveCall = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user!.userId;
    const { callId } = req.params;

    const call = await this.leaveCallUseCase.execute(callId as string, userId);

    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success('Left call successfully.', { call }));
  };
}
