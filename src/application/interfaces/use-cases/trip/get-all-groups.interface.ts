import { GetGroupsRequestDTO } from '../../../dtos/group/request/get-all-groups.dto';
import { GetGroupsResponseDTO } from '../../../dtos/group/responce/get-groups.dto';

export interface IGetAllTripGroups {
  execute(dto: GetGroupsRequestDTO): Promise<GetGroupsResponseDTO>;
}
