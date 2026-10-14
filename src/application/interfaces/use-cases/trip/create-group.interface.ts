export interface CreateGroupDTO {
  userId: string;
  name: string;

  placeId?: string;
  destinationName?: string;
  city?: string | null;
  state?: string | null;
  countryCode?: string;
  latitude?: number;
  longitude?: number;

  dateFrom?: Date;
  dateTo?: Date;
  coverUrl?: string;
  currencyCode?: string;
  description?: string;
}

export interface ICreateGroup {
  execute(dto: CreateGroupDTO): Promise<void>;
}

