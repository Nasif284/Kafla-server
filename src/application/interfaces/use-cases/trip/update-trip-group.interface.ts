import { GroupData } from '../../../dtos/group/responce/get-groups.dto';

export interface UpdateTripGroupDTO {
  groupId: string;
  userId: string;
  name?: string;
  description?: string;
  coverUrl?: string;
  currencyCode?: string;
  placeId?: string;
  destinationName?: string;
  city?: string;
  state?: string;
  countryCode?: string;
  latitude?: number;
  longitude?: number;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface IUpdateTripGroup {
  execute(dto: UpdateTripGroupDTO): Promise<GroupData>;
}
