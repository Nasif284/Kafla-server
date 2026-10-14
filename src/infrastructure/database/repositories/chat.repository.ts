import { inject, injectable } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import {
  ChatMessageDTO,
  IChatRepository,
  SaveChatMessageDTO,
} from '../../../application/interfaces/repositories/chat.repository';
import { TOKENS } from '../../di/tokens';
import { ChatMessageType, MessageStatus } from '../../../domain/enums';

@injectable()
export class ChatRepository implements IChatRepository {
  constructor(
    @inject(TOKENS.PrismaClient) private readonly prisma: PrismaClient,
  ) {}

  async getOrCreateGroupConversation(groupId: string): Promise<string> {
    const existing = await this.prisma.chatConversation.findUnique({
      where: {
        groupId,
      },
      select: {
        id: true,
      },
    });

    if (existing) {
      return existing.id;
    }

    const conversation = await this.prisma.chatConversation.create({
      data: {
        groupId,
      },
      select: {
        id: true,
      },
    });

    return conversation.id;
  }

  async getConversation(conversationId: string) {
    return this.prisma.chatConversation.findUnique({
      where: {
        id: conversationId,
      },
      select: {
        id: true,
        groupId: true,
      },
    });
  }

  async isGroupConversationMember(
    conversationId: string,
    userId: string,
  ): Promise<boolean> {
    const conversation = await this.prisma.chatConversation.findFirst({
      where: {
        id: conversationId,
        group: {
          members: {
            some: {
              userId,
            },
          },
        },
      },
      select: {
        id: true,
      },
    });

    return !!conversation;
  }

  async saveMessage(
    conversationId: string,
    senderId: string,
    data: SaveChatMessageDTO,
  ): Promise<ChatMessageDTO> {
    const message = await this.prisma.chatMessage.create({
      data: {
        conversationId,
        senderId,
        type: data.type as ChatMessageType,
        content: data.content ?? '',

        ...(data.type === ChatMessageType.IMAGE && data.attachment
          ? {
              attachment: {
                create: {
                  storageKey: data.attachment.storageKey,
                  fileName: data.attachment.fileName,
                  mimeType: data.attachment.mimeType,
                  fileSize: data.attachment.fileSize,
                },
              },
            }
          : {}),
      },

      select: {
        id: true,
        conversationId: true,
        senderId: true,
        type: true,
        content: true,
        status: true,
        readAt: true,
        createdAt: true,
        updatedAt: true,

        attachment: {
          select: {
            storageKey: true,
            fileName: true,
            mimeType: true,
            fileSize: true,
          },
        },

        sender: {
          select: {
            fullName: true,
            avatarUrl: true,
          },
        },
      },
    });
    await this.prisma.chatConversation.update({
      where: {
        id: conversationId,
      },
      data: {
        updatedAt: new Date(),
      },
    });
    return {
      ...message,
      type: message.type as unknown as ChatMessageType,
      status: message.status as unknown as MessageStatus,
    };
  }

  async getMessages(
    conversationId: string,
    limit: number,
    cursor?: string,
  ): Promise<ChatMessageDTO[]> {
    const messages = await this.prisma.chatMessage.findMany({
      where: {
        conversationId,
      },

      orderBy: {
        createdAt: 'desc',
      },

      take: limit + 1,

      ...(cursor
        ? {
            cursor: {
              id: cursor,
            },
            skip: 1,
          }
        : {}),

      select: {
        id: true,
        conversationId: true,
        senderId: true,
        type: true,
        content: true,
        status: true,
        readAt: true,
        createdAt: true,
        updatedAt: true,

        attachment: {
          select: {
            storageKey: true,
            fileName: true,
            mimeType: true,
            fileSize: true,
          },
        },

        sender: {
          select: {
            fullName: true,
            avatarUrl: true,
          },
        },
      },
    });

    return messages.reverse().map((m) => ({
      ...m,
      type: m.type as unknown as ChatMessageType,
      status: m.status as unknown as MessageStatus,
    }));
  }

  async markMessagesAsRead(
    conversationId: string,
    userId: string,
  ): Promise<{ count: number; readAt: Date }> {
    const now = new Date();
    const result = await this.prisma.chatMessage.updateMany({
      where: {
        conversationId,
        senderId: { not: userId },
        status: { not: MessageStatus.READ },
      },
      data: {
        status: MessageStatus.READ,
        readAt: now,
      },
    });

    return { count: result.count, readAt: now };
  }
}
