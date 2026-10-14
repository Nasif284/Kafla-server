import { inject, injectable } from 'tsyringe';
import { TOKENS } from '../../../infrastructure/di/tokens';
import { Request, Response } from 'express';
import { HttpStatus } from '../../../domain/enums/HttpStatusCodes.constants';
import { ApiResponse } from '../../responses/common-response';
import { TRIP_MESSAGES } from '../../../shared/constants/messages/success/trip/trip.messages';
import { ICreateGroup } from '../../../application/interfaces/use-cases/trip/create-group.interface';
import { IUpdateTripGroup } from '../../../application/interfaces/use-cases/trip/update-trip-group.interface';
import { IDeleteTripGroup } from '../../../application/interfaces/use-cases/trip/delete-trip-group.interface';
import { IGetActiveGroups } from '../../../application/interfaces/use-cases/trip/get-active-groups.interface';
import { IGetPastGroups } from '../../../application/interfaces/use-cases/trip/get-past-groups.interface';
import { IAddMembers } from '../../../application/interfaces/use-cases/trip/add-members.interface';
import { IGetMembers } from '../../../application/interfaces/use-cases/trip/get-memeber.usecase';
import { IGetGroup } from '../../../application/interfaces/use-cases/trip/get-group.interface';
import { IGetInviteCode } from '../../../application/interfaces/use-cases/trip/get-invite-code.interface';
import { ISendInvite } from '../../../application/interfaces/use-cases/trip/send-invite.interface';
import { IJoinWithLink } from '../../../application/interfaces/use-cases/trip/join-with-link.interface';
import { IGetInvites } from '../../../application/interfaces/use-cases/trip/get-invites.interface';
import { IRemoveMember } from '../../../application/interfaces/use-cases/trip/remove-member.inteface';
import { IChangeMemberRole } from '../../../application/interfaces/use-cases/trip/change-member-role.interface';
import { IGetWeather } from '../../../application/interfaces/use-cases/trip/get-weather.interface';

@injectable()
export class TripController {
  constructor(
    @inject(TOKENS.ICreateGroup)
    private readonly _createGroup: ICreateGroup,
    @inject(TOKENS.IUpdateTripGroup)
    private readonly _updateGroup: IUpdateTripGroup,
    @inject(TOKENS.IDeleteTripGroup)
    private readonly _deleteGroup: IDeleteTripGroup,
    @inject(TOKENS.IGetActiveGroups)
    private readonly _getActiveGroups: IGetActiveGroups,
    @inject(TOKENS.IGetPastGroups)
    private readonly _getPastGroups: IGetPastGroups,
    @inject(TOKENS.IAddMembers)
    private readonly _addMembers: IAddMembers,
    @inject(TOKENS.IGetMembers)
    private readonly _getMembers: IGetMembers,
    @inject(TOKENS.IGetGroup)
    private readonly _getGroup: IGetGroup,
    @inject(TOKENS.IGetInviteCode)
    private readonly _getInviteCode: IGetInviteCode,
    @inject(TOKENS.ISendInvite)
    private readonly _sendInvite: ISendInvite,
    @inject(TOKENS.IJoinWithLink)
    private readonly _joinWithLink: IJoinWithLink,
    @inject(TOKENS.IGetInvites)
    private readonly _getInvites: IGetInvites,
    @inject(TOKENS.IRemoveMember)
    private readonly _removeMember: IRemoveMember,
    @inject(TOKENS.IChangeRole)
    private readonly _changeRole: IChangeMemberRole,
    @inject(TOKENS.IGetWeather)
    private readonly _getTripWeather: IGetWeather,
  ) {}

  createGroup = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user?.userId;
    const {
      name,
      placeId,
      destinationName,
      city,
      state,
      countryCode,
      latitude,
      longitude,
      dateFrom,
      dateTo,
      coverUrl,
      currencyCode,
      description,
    } = req.body || {};

    await this._createGroup.execute({
      userId: userId!,
      name,
      placeId,
      destinationName,
      city,
      state,
      countryCode,
      latitude: latitude !== undefined ? Number(latitude) : undefined,
      longitude: longitude !== undefined ? Number(longitude) : undefined,
      dateFrom: dateFrom ? new Date(dateFrom) : undefined,
      dateTo: dateTo ? new Date(dateTo) : undefined,
      coverUrl,
      currencyCode,
      description,
    });
    return res
      .status(HttpStatus.CREATED)
      .json(ApiResponse.success(TRIP_MESSAGES.TRIP_GROUP_CREATED));
  };

  getActiveGroups = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user?.userId;
    const data = await this._getActiveGroups.execute({
      userId: userId!,
    });
    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success(TRIP_MESSAGES.FETCHED_ACTIVE_GROUPS, data));
  };

  getPastGroups = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user?.userId;
    const data = await this._getPastGroups.execute({
      userId: userId!,
    });
    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success(TRIP_MESSAGES.FETCHED_PAST_GROUPS, data));
  };

  addMembers = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user?.userId;
    const groupId = req.params.id;
    const { members } = req.body;
    await this._addMembers.execute({
      members,
      groupId: groupId as string,
      addedBy: userId!,
    });
    return res
      .status(HttpStatus.CREATED)
      .json(ApiResponse.success(TRIP_MESSAGES.ADDED_MEMBER));
  };

  getMembers = async (req: Request, res: Response): Promise<Response> => {
    const groupId = req.params.id;
    const data = await this._getMembers.execute({ groupId: groupId as string });
    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success(TRIP_MESSAGES.GET_MEMBERS, data));
  };

  getGroup = async (req: Request, res: Response): Promise<Response> => {
    const groupId = req.params.id;
    const data = await this._getGroup.execute({ groupId: groupId as string });
    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success(TRIP_MESSAGES.GET_GROUP, data));
  };

  getInviteCode = async (req: Request, res: Response): Promise<Response> => {
    const groupId = req.params.id;
    const data = await this._getInviteCode.execute({
      groupId: groupId as string,
    });
    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success(TRIP_MESSAGES.GET_INVITE_CODE, data));
  };

  sendInvite = async (req: Request, res: Response): Promise<Response> => {
    const groupId = req.params.id;
    const userId = req.user?.userId;
    const { email } = req.body;
    await this._sendInvite.execute({
      groupId: groupId as string,
      email,
      invitedBy: userId!,
    });
    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success(TRIP_MESSAGES.INVITE_SENT));
  };

  joinWithLink = async (req: Request, res: Response): Promise<Response> => {
    const { inviteCode } = req.params;
    const userId = req.user?.userId;
    const data = await this._joinWithLink.execute({
      inviteCode: inviteCode as string,
      userId: userId!,
    });
    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success(TRIP_MESSAGES.JOINED_GROUP, data));
  };

  getInvites = async (req: Request, res: Response): Promise<Response> => {
    const groupId = req.params.id;
    const data = await this._getInvites.execute({
      groupId: groupId as string,
    });
    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success(TRIP_MESSAGES.GET_INVITES, data));
  };

  removeMember = async (req: Request, res: Response): Promise<Response> => {
    const groupId = req.params.id;
    const memberId = req.params.memberId;
    const userId = req.user?.userId;
    await this._removeMember.execute({
      groupId: groupId as string,
      memberId: memberId as string,
      userId: userId!,
    });
    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success(TRIP_MESSAGES.REMOVE_MEMBER));
  };

  leaveGroup = async (req: Request, res: Response): Promise<Response> => {
    const groupId = req.params.id;
    const memberId = req.user?.userId;
    await this._removeMember.execute({
      groupId: groupId as string,
      memberId: memberId as string,
      userId: memberId as string,
    });
    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success(TRIP_MESSAGES.LEFT_GROUP));
  };

  changeRole = async (req: Request, res: Response): Promise<Response> => {
    const groupId = req.params.id;
    const memberId = req.params.memberId;
    await this._changeRole.execute({
      groupId: groupId as string,
      memberId: memberId as string,
    });
    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success(TRIP_MESSAGES.CHANGE_ROLE));
  };

  getTripWeather = async (req: Request, res: Response): Promise<Response> => {
    const groupId = req.params.id;
    const data = await this._getTripWeather.execute({
      tripGroupId: groupId as string,
    });
    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success(TRIP_MESSAGES.GET_WEATHER, data));
  };

  updateGroup = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user?.userId;
    const groupId = req.params.id as string;
    const {
      name,
      placeId,
      destinationName,
      city,
      state,
      countryCode,
      latitude,
      longitude,
      dateFrom,
      dateTo,
      description,
      coverUrl,
      currencyCode,
    } = req.body;

    const response = await this._updateGroup.execute({
      groupId,
      userId: userId!,
      name,
      placeId,
      destinationName,
      city,
      state,
      countryCode,
      latitude,
      longitude,
      dateFrom: dateFrom ? new Date(dateFrom) : undefined,
      dateTo: dateTo ? new Date(dateTo) : undefined,
      description,
      coverUrl,
      currencyCode,
    });

    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success("Trip updated successfully", response));
  };

  deleteGroup = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user?.userId;
    const groupId = req.params.id as string;

    await this._deleteGroup.execute({
      groupId,
      userId: userId!,
    });

    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success("Trip deleted successfully"));
  };
}
