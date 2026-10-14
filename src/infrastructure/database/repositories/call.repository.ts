import { inject, injectable } from 'tsyringe';

import { PrismaClient } from '@prisma/client';
import {
  CreateCallData,
  CreateCallParticipantData,
  ICallRepository,
} from '../../../application/interfaces/repositories/call.repository.interface';
import {
  CallDTO,
  CallMediaType,
  CallParticipantDTO,
  CallParticipantStatus,
  CallScope,
  CallStatus,
} from '../../../application/dtos/call/request/call.dto';
import { TOKENS } from '../../di/tokens';

@injectable()
export class CallRepository implements ICallRepository {
  constructor(
    @inject(TOKENS.PrismaClient) private readonly prisma: PrismaClient,
  ) {}

  async createCall(data: CreateCallData): Promise<CallDTO> {
    const call = await this.prisma.call.create({
      data: {
        mediaType: data.mediaType,
        callerId: data.callerId,
        tripGroupId: data.tripGroupId,
      },
      include: {
        caller: true,
      },
    });

    return {
      ...call,
      scope: CallScope.TRIP_GROUP,
      mediaType: call.mediaType as unknown as CallMediaType,
      status: call.status as unknown as CallStatus,
    };
  }

  async createParticipant(
    data: CreateCallParticipantData,
  ): Promise<CallParticipantDTO> {
    const participant = await this.prisma.callParticipant.create({
      data,
      include: {
        user: {
          select: {
            fullName: true,
            avatarUrl: true,
          },
        },
      },
    });

    return {
      ...participant,
      status: participant.status as unknown as CallParticipantStatus,
    };
  }

  async createParticipants(data: CreateCallParticipantData[]): Promise<void> {
    await this.prisma.callParticipant.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async findById(callId: string): Promise<CallDTO | null> {
    const call = await this.prisma.call.findUnique({
      where: {
        id: callId,
      },
    });

    if (!call) return null;

    return {
      ...call,
      scope: CallScope.TRIP_GROUP,
      mediaType: call.mediaType as unknown as CallMediaType,
      status: call.status as unknown as CallStatus,
    };
  }

  async findParticipant(
    callId: string,
    userId: string,
  ): Promise<CallParticipantDTO | null> {
    const participant = await this.prisma.callParticipant.findUnique({
      where: {
        callId_userId: {
          callId,
          userId,
        },
      },
      include: {
        user: {
          select: {
            fullName: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (!participant) return null;

    return {
      ...participant,
      status: participant.status as unknown as CallParticipantStatus,
    };
  }

  async updateParticipantStatus(
    callId: string,
    userId: string,
    status: CallParticipantStatus,
  ): Promise<CallParticipantDTO> {
    const participant = await this.prisma.callParticipant.update({
      where: {
        callId_userId: {
          callId,
          userId,
        },
      },
      data: {
        status,
      },
    });

    return {
      ...participant,
      status: participant.status as unknown as CallParticipantStatus,
    };
  }

  async updateCallStatus(callId: string, status: CallStatus): Promise<CallDTO> {
    const call = await this.prisma.call.update({
      where: {
        id: callId,
      },
      data: {
        status,
      },
    });

    return {
      ...call,
      scope: CallScope.TRIP_GROUP,
      mediaType: call.mediaType as unknown as CallMediaType,
      status: call.status as unknown as CallStatus,
    };
  }

  async updateCallStarted(callId: string): Promise<CallDTO> {
    const call = await this.prisma.call.update({
      where: {
        id: callId,
      },
      data: {
        status: CallStatus.ACTIVE,
        startedAt: new Date(),
      },
    });

    return {
      ...call,
      scope: CallScope.TRIP_GROUP,
      mediaType: call.mediaType as unknown as CallMediaType,
      status: call.status as unknown as CallStatus,
    };
  }

  async updateCallEnded(callId: string): Promise<CallDTO> {
    const call = await this.prisma.call.update({
      where: {
        id: callId,
      },
      data: {
        status: CallStatus.ENDED,
        endedAt: new Date(),
      },
    });

    return {
      ...call,
      scope: CallScope.TRIP_GROUP,
      mediaType: call.mediaType as unknown as CallMediaType,
      status: call.status as unknown as CallStatus,
    };
  }

  async getParticipants(callId: string): Promise<CallParticipantDTO[]> {
    const participants = await this.prisma.callParticipant.findMany({
      where: {
        callId,
      },
      include: {
        user: {
          select: {
            fullName: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        joinedAt: 'asc',
      },
    });

    return participants.map((p) => ({
      ...p,
      status: p.status as unknown as CallParticipantStatus,
    }));
  }

  async findByIdWithParticipants(callId: string): Promise<CallDTO | null> {
    const call = await this.prisma.call.findUnique({
      where: {
        id: callId,
      },
      include: {
        participants: true,
      },
    });

    if (!call) return null;

    return {
      ...call,
      scope: CallScope.TRIP_GROUP,
      mediaType: call.mediaType as unknown as CallMediaType,
      status: call.status as unknown as CallStatus,
      participants: call.participants.map((p) => ({
        ...p,
        status: p.status as unknown as CallParticipantStatus,
      })),
    };
  }

  async updateParticipantJoined(
    callId: string,
    userId: string,
  ): Promise<CallParticipantDTO> {
    const participant = await this.prisma.callParticipant.update({
      where: {
        callId_userId: {
          callId,
          userId,
        },
      },
      data: {
        status: CallParticipantStatus.JOINED,
        joinedAt: new Date(),
        leftAt: null,
      },
    });

    return {
      ...participant,
      status: participant.status as unknown as CallParticipantStatus,
    };
  }

  async countJoinedParticipants(callId: string): Promise<number> {
    return this.prisma.callParticipant.count({
      where: {
        callId,
        status: CallParticipantStatus.JOINED,
      },
    });
  }
}
