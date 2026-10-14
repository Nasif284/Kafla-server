import {
  CallMediaType,
  CallScope,
  CallStatus,
  CallParticipantStatus,
} from '../../../../domain/enums';

export {
  CallMediaType,
  CallScope,
  CallStatus,
  CallParticipantStatus,
};

export interface CallParticipantDTO {
  id: string;
  userId: string;
  user?: {
    fullName: string;
    avatarUrl: string | null;
  };
  status: CallParticipantStatus;
  joinedAt: Date | null;
  leftAt: Date | null;
}

export interface CallDTO {
  id: string;
  scope: CallScope;
  mediaType: CallMediaType;
  status: CallStatus;

  callerId: string;
  recipientId?: string | null;
  tripGroupId: string | null;
  groupName?: string;
  groupCoverUrl?: string | null;

  startedAt: Date | null;
  endedAt: Date | null;
  createdAt: Date;

  caller?: {
    fullName: string;
    avatarUrl: string | null;
  };
  participants?: CallParticipantDTO[];
}
