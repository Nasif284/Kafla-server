import { GetGroupInvitesResponse } from '../../../dtos/group/responce/get-invites.dto';

export interface IGetInvites {
  execute(dto: { groupId: string }): Promise<GetGroupInvitesResponse>;
}
