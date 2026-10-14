import { CallMediaType } from '../../dtos/call/request/call.dto';

export interface ParticipantJoinedNotification {
  callId: string;
  userId: string;
  name?: string;
  profileImage?: string | null;
}

export interface GroupCallNotification {
  callId: string;
  tripGroupId: string;
  groupName: string;
  groupCoverUrl: string | null;
  callerId: string;
  callerName: string;
  callerProfileImage: string | null;
  mediaType: CallMediaType;
}

export interface ICallNotificationService {
  notifyIncomingGroupCall(
    recipientIds: string[],
    data: GroupCallNotification,
  ): void;

  notifyGroupParticipantJoined(
    callId: string,
    participantUserId: string,
    name: string,
    avatarUrl: string | null,
    participantUserIds: string[],
  ): void;

  notifyParticipantLeft(
    callId: string,
    participantUserId: string,
    recipientUserIds: string[],
  ): void;

  notifyCallEnded(callId: string, recipientUserIds: string[]): void;
}
