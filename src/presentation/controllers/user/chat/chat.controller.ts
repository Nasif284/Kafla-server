import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { TOKENS } from '../../../../infrastructure/di/tokens';
import { IGetGroupChatUseCase } from '../../../../application/interfaces/use-cases/chats/get-group-chat.interface';
import { ISendChatMessageUseCase } from '../../../../application/interfaces/use-cases/chats/send-message.interface';
import { IGetChatMessagesUseCase } from '../../../../application/interfaces/use-cases/chats/get-messages.interface';
import { HttpStatus } from '../../../../domain/enums/HttpStatusCodes.constants';
import { ApiResponse } from '../../../responses/common-response';
import { IUploadChatImageUseCase } from '../../../../application/interfaces/use-cases/chats/upload-chat-image.interface';

@injectable()
export class ChatController {
  constructor(
    @inject(TOKENS.IGetGroupChatUseCase)
    private readonly _getGroupChat: IGetGroupChatUseCase,
    @inject(TOKENS.ISendChatMessageUseCase)
    private readonly _sendMessage: ISendChatMessageUseCase,
    @inject(TOKENS.IGetChatMessagesUseCase)
    private readonly _getMessages: IGetChatMessagesUseCase,
    @inject(TOKENS.IUploadChatImageUseCase)
    private readonly _uploadChatImageUseCase: IUploadChatImageUseCase,
  ) {}

  getGroupChat = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user?.userId;
    const { groupId } = req.params;
    const conversationId = await this._getGroupChat.execute(
      userId!,
      groupId as string,
    );
    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success('Fetched Conversation', { conversationId }));
  };

  getMessages = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user?.userId;
    const { conversationId } = req.params;
    const limit = req.query.limit ? Number(req.query.limit) : 30;

    const cursor =
      typeof req.query.cursor === 'string' ? req.query.cursor : undefined;

    const messages = await this._getMessages.execute(
      userId!,
      conversationId as string,
      limit,
      cursor,
    );

    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success('Fetched messages', { messages }));
  };

  uploadImage = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user?.userId;
    const conversationId = req.body.conversationId;
    const file = req.file;

    if (!file) {
      throw new Error('Image file is required.');
    }
    if (!conversationId) {
      throw new Error('Conversation ID is required.');
    }

    const result = await this._uploadChatImageUseCase.execute(
      userId!,
      conversationId,
      file,
    );
    return res
      .status(HttpStatus.CREATED)
      .json(ApiResponse.success('image uploaded', result));
  };
}
