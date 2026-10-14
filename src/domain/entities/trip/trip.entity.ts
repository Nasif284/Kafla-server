import { TripMemberRole, TripInviteStatus } from '../../enums';

export interface CountryEntity {
  code: string;
  name: string;
  phonePrefix?: string | null;
}

export interface DestinationEntity {
  id: string;
  placeId: string;
  name: string;
  city?: string | null;
  state?: string | null;
  countryCode: string;
  latitude: number | string;
  longitude: number | string;
  coverUrl?: string | null;
  createdAt: Date;
  country?: CountryEntity;
}

export interface TripGroupEntity {
  id: string;
  name: string;
  description?: string | null;
  destinationId: string;
  dateFrom: Date;
  dateTo: Date;
  coverUrl?: string | null;
  currencyCode: string;
  statusCode: string;
  inviteCode: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  destination?: DestinationEntity;
}

export interface TripMemberEntity {
  id: string;
  groupId: string;
  userId: string;
  roleCode: TripMemberRole;
  addedBy?: string | null;
  joinedAt: Date;
  leftAt?: Date | null;
  isActive: boolean;
}

export interface TripInviteEntity {
  id: string;
  groupId: string;
  invitedBy: string;
  invitedUserEmail?: string | null;
  message?: string | null;
  statusCode: TripInviteStatus;
  expiresAt?: Date | null;
  respondedAt?: Date | null;
  createdAt: Date;
}
