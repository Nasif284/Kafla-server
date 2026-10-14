import { inject, injectable } from 'tsyringe';
import { IGetPastGroups } from '../../interfaces/use-cases/trip/get-past-groups.interface';
import { TOKENS } from '../../../infrastructure/di/tokens';
import { ITripGroupRepository } from '../../interfaces/repositories/group.repository';
import { GetGroupsResponseDTO } from '../../dtos/group/responce/get-groups.dto';
import { IStorageService } from '../../interfaces/services/storage.service.interface';

@injectable()
export class GetPastGroups implements IGetPastGroups {
  constructor(
    @inject(TOKENS.ITripGroupRepository)
    private readonly _tripGroupRepository: ITripGroupRepository,
    @inject(TOKENS.IStorageService)
    private readonly _storageService: IStorageService,
  ) {}

  async execute(dto: { userId: string }): Promise<GetGroupsResponseDTO> {
    const groups = await this._tripGroupRepository.getPastGroups(dto.userId);

    for (const group of groups) {
      for (const member of group.members) {
        if (member.avatarUrl) {
          member.avatarUrl = await this._storageService.getSignedUrl(
            member.avatarUrl,
          );
        }
      }
    }
    return {
      groups,
    };
  }
}
