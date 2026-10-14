import { GetGroupsResponseDTO } from '../../../dtos/group/responce/get-groups.dto';

export interface IGetActiveGroups {
  execute(dto: { userId: string }): Promise<GetGroupsResponseDTO>;
}
