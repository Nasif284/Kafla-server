import { ChatMessageType, MessageStatus } from '../../../domain/enums';

export interface ChatMessageDTO {
  id: string;
  conversationId: string;
  senderId: string;

  type: ChatMessageType;

  content: string;

  status: MessageStatus;
  readAt?: Date | null;

  attachment?: {
    storageKey: string;
    fileName: string | null;
    mimeType: string;
    fileSize: number | null;
    url?: string;
  } | null;

  sender?: {
    fullName: string;
    avatarUrl: string | null;
  };

  createdAt: Date;
  updatedAt: Date;
}

export interface SaveChatMessageDTO {
  type: ChatMessageType;

  content?: string;

  attachment?: {
    storageKey: string;
    fileName?: string;
    mimeType: string;
    fileSize: number;
  };
}

export interface IChatRepository {
  getOrCreateGroupConversation(groupId: string): Promise<string>;

  getConversation(conversationId: string): Promise<{
    id: string;
    groupId: string;
  } | null>;

  isGroupConversationMember(
    conversationId: string,
    userId: string,
  ): Promise<boolean>;

  saveMessage(
    conversationId: string,
    senderId: string,
    data: SaveChatMessageDTO,
  ): Promise<ChatMessageDTO>;

  getMessages(
    conversationId: string,
    limit: number,
    cursor?: string,
  ): Promise<ChatMessageDTO[]>;

  markMessagesAsRead(
    conversationId: string,
    userId: string,
  ): Promise<{ count: number; readAt: Date }>;
}
