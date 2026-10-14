import { GetGroupsResponseDTO } from '../../../dtos/group/responce/get-groups.dto';

export interface IGetUserGroups {
  execute(dto: { userId: string }): Promise<GetGroupsResponseDTO>;
}
