import {
  CreateDestinationRequestDTO,
  Destination,
} from '../../dtos/group/request/destination.dto';
import { GetGroupsRequestDTO } from '../../dtos/group/request/get-all-groups.dto';
import { GetAllGroupsResponseDTO } from '../../dtos/group/responce/get-all-groups.dto';
import {
  GetGroupsResponseDTO,
  GroupData,
} from '../../dtos/group/responce/get-groups.dto';
import { GetGroupInvitesResponse } from '../../dtos/group/responce/get-invites.dto';

export interface GroupTripForAI {
  startDate: Date;
  endDate: Date;
  budgetStyle: string;
  travelStyle: string;
  travellers: number;
  destination: {
    placeId: string;
    name: string;
    city: string | null;
    state: string | null;
    country: string;
    latitude: number;
    longitude: number;
  };
}

export interface CreateGroupRepoDTO {
  name: string;
  destinationId: string;
  dateFrom: Date;
  dateTo: Date;
  userId: string;
  inviteCode: string;
  description?: string;
  coverUrl?: string;
  currencyCode?: string;
}

import { TripDestination } from '../../dtos/group/responce/get-weather.dto';

export interface UpdateGroupRepoDTO {
  name?: string;
  description?: string;
  coverUrl?: string;
  currencyCode?: string;
  destinationId?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface ITripGroupRepository {
  findDestinationByPlaceId(placeId: string): Promise<Destination | null>;
  createDestination(payload: CreateDestinationRequestDTO): Promise<Destination>;
  updateDestinationCover(id: string, coverUrl: string): Promise<void>;
  createGroup(
    tripIdOrPayload: string | CreateGroupRepoDTO,
    userId?: string,
    inviteCode?: string,
  ): Promise<void>;
  updateGroup(
    groupId: string,
    userId: string,
    payload: UpdateGroupRepoDTO,
  ): Promise<GroupData>;
  deleteGroup(groupId: string, userId: string): Promise<void>;
  getActiveGroups(userId: string): Promise<GroupData[]>;
  getPastGroups(userId: string): Promise<GroupData[]>;
  getInviteCode(groupId: string): Promise<{ inviteCode: string }>;
  createGroupInvite(payload: {
    groupId: string;
    invitedBy: string;
    invitedUserEmail: string;
  }): Promise<void>;
  joinGroupByInviteCode(payload: {
    inviteCode: string;
    userId: string;
  }): Promise<{ groupId: string; alreadyMember?: boolean }>;
  GetGroupWithDetails(groupId: string): Promise<GroupData>;
  getGroupWithDetails(groupId: string): Promise<GroupData>;
  getGroupInvites(groupId: string): Promise<GetGroupInvitesResponse>;
  getAllTripGroups(
    payload: GetGroupsRequestDTO,
  ): Promise<GetAllGroupsResponseDTO>;
  getUserTripGroups(userId: string): Promise<GetGroupsResponseDTO>;
  getTripDestination(groupId: string): Promise<TripDestination | null>;
}

