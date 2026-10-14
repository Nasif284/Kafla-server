import { inject, injectable } from 'tsyringe';
import { IGetInvites } from '../../interfaces/use-cases/trip/get-invites.interface';
import { TOKENS } from '../../../infrastructure/di/tokens';
import { ITripGroupRepository } from '../../interfaces/repositories/group.repository';
import { GetGroupInvitesResponse } from '../../dtos/group/responce/get-invites.dto';

@injectable()
export class GetInvites implements IGetInvites {
  constructor(
    @inject(TOKENS.ITripGroupRepository)
    private readonly _tripGroupRepository: ITripGroupRepository,
  ) {}
  async execute(dto: { groupId: string }): Promise<GetGroupInvitesResponse> {
    return await this._tripGroupRepository.getGroupInvites(dto.groupId);
  }
}
