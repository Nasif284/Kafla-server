import {
  CallMediaType,
  CallStatus,
  CallParticipantStatus,
} from '../../enums';

export interface CallParticipantEntity {
  id: string;
  callId: string;
  userId: string;
  status: CallParticipantStatus;
  joinedAt?: Date | null;
  leftAt?: Date | null;
}

export interface CallEntity {
  id: string;
  tripGroupId: string;
  callerId: string;
  mediaType: CallMediaType;
  status: CallStatus;
  startedAt?: Date | null;
  endedAt?: Date | null;
  createdAt: Date;
  participants?: CallParticipantEntity[];
}
