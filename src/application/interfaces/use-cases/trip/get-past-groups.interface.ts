import { GetGroupsResponseDTO } from '../../../dtos/group/responce/get-groups.dto';

export interface IGetPastGroups {
  execute(dto: { userId: string }): Promise<GetGroupsResponseDTO>;
}
