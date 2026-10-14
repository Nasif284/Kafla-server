import { GetMembersResponseDTO } from '../../../dtos/group/responce/get-members.dto';

export interface IGetMembers {
  execute(dto: { groupId: string }): Promise<GetMembersResponseDTO>;
}
