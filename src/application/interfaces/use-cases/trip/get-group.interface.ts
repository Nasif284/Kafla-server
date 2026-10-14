import { GroupData } from '../../../dtos/group/responce/get-groups.dto';

export interface IGetGroup {
  execute(dto: { groupId: string }): Promise<GroupData>;
}
