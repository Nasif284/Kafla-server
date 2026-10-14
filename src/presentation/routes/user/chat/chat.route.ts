import { Router } from 'express';
import { ChatController } from '../../../controllers/user/chat/chat.controller';
import { UserAuthMiddleware } from '../../../middleware/user/auth/userAuth.middleware';
import { asyncHandler } from '../../../middleware/error/asyncHandler';
import { upload } from '../../../middleware/storage/multer.middleware';

export function buildChatRoutes(
  controller: ChatController,
  auth: UserAuthMiddleware,
): Router {
  const router = Router();

  router.get(
    '/group/:groupId',
    auth.authenticate,
    asyncHandler(controller.getGroupChat),
  );

  // router.post(
  //   '/:conversationId/messages',
  //   auth.authenticate,
  //   asyncHandler(controller.sendMessage),
  // );

  router.get(
    '/:conversationId/messages',
    auth.authenticate,
    asyncHandler(controller.getMessages),
  );
  router.post(
    '/upload/image',
    auth.authenticate,
    upload.single('image'),
    asyncHandler(controller.uploadImage),
  );

  return router;
}
