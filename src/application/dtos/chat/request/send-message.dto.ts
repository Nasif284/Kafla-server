import { ChatMessageType } from '../../../../domain/enums';

export interface SendChatMessageDTO {
  conversationId: string;

  type: ChatMessageType;

  content?: string;

  attachment?: {
    storageKey: string;
    fileName?: string;
    mimeType: string;
    fileSize: number;
  };
}
