export interface GroupMembers {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  joinedAt?: Date;
  tripCount?: number;
  reportCount?: number;
}

export interface GroupDestinationDetails {
  id: string;
  placeId: string;
  name: string;
  city: string | null;
  state: string | null;
  country: string;
  latitude: number;
  longitude: number;
  coverUrl?: string | null;
}

export interface GroupData {
  id: string;
  name: string;
  description?: string | null;
  dateTo: Date;
  dateFrom: Date;
  coverUrl: string;
  destination: string;
  inviteCode?: string;
  statusCode?: string;
  currencyCode?: string;
  destinationDetails?: GroupDestinationDetails;
  members: GroupMembers[];
}

export interface GetGroupsResponseDTO {
  groups: GroupData[];
}

