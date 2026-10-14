import { Server } from 'socket.io';
import { inject, injectable } from 'tsyringe';

import {
  GroupCallNotification,
  ICallNotificationService,
  ParticipantJoinedNotification,
} from '../../application/interfaces/services/call-notification.service.interface';

import { TOKENS } from '../di/tokens';

@injectable()
export class CallNotificationService implements ICallNotificationService {
  constructor(
    @inject(TOKENS.Socket)
    private readonly io: Server,
  ) {}

  notifyGroupParticipantJoined(
    callId: string,
    participantUserId: string,
    name: string,
    avatarUrl: string | null,
    participantUserIds: string[],
  ): void {
    const data: ParticipantJoinedNotification = {
      callId,
      userId: participantUserId,
      name,
      profileImage: avatarUrl,
    };

    for (const userId of participantUserIds) {
      if (userId === participantUserId) {
        continue;
      }

      this.io.to(`user:${userId}`).emit('call:participant-joined', data);
    }
  }

  notifyIncomingGroupCall(
    recipientIds: string[],
    data: GroupCallNotification,
  ): void {
    for (const userId of recipientIds) {
      this.io.to(`user:${userId}`).emit('call:group-incoming', data);
    }
  }

  notifyParticipantLeft(
    callId: string,
    participantUserId: string,
    recipientUserIds: string[],
  ): void {
    const data = {
      callId,
      userId: participantUserId,
    };

    for (const userId of recipientUserIds) {
      this.io.to(`user:${userId}`).emit('call:participant-left', data);
    }
  }

  notifyCallEnded(callId: string, recipientUserIds: string[]): void {
    for (const userId of recipientUserIds) {
      this.io.to(`user:${userId}`).emit('call:ended', {
        callId,
      });
    }
  }
}
