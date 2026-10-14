import { ChatMessageType, MessageStatus } from '../../enums';

export interface ChatMessageAttachmentEntity {
  id: string;
  messageId: string;
  storageKey: string;
  mimeType: string;
  fileName?: string | null;
  fileSize?: number | null;
  createdAt: Date;
}

export interface ChatMessageEntity {
  id: string;
  conversationId: string;
  senderId: string;
  type: ChatMessageType;
  content: string;
  status: MessageStatus;
  readAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  attachment?: ChatMessageAttachmentEntity | null;
}

export interface ChatConversationEntity {
  id: string;
  groupId: string;
  createdAt: Date;
  updatedAt: Date;
  messages?: ChatMessageEntity[];
}
