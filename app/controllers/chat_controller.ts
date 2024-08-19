import User from '#models/user';
import MessageService from '#services/message_service';
import { messageForm } from '#validators/message_form';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import transmit from '@adonisjs/transmit/services/main';

@inject()
export default class ChatController {
  constructor(protected messageService: MessageService) {}

  async showChat({ auth, request, inertia, response }: HttpContext) {
    const senderId = auth.user!.id;
    const targetId = request.param('targetId');
    if (Number(targetId) === senderId) {
      return response.redirect('/chat');
    }

    const conversations =
      await this.messageService.getConversationsOfUser(senderId);

    const users =
      await this.messageService.getUsersWhoNeverTalkedToTheCurrentUser(
        senderId
      );

    const props = {
      conversations,
      targetId,
      users,
    };

    if (targetId) {
      const targetUser = await User.findByOrFail('id', targetId);
      const messages = await this.messageService.getMessages(
        senderId,
        targetId
      );
      const chatTargetUrl = this.generateChatTargetUrl(senderId, targetId);
      return inertia.render('chat', {
        ...props,
        messages,
        targetUser,
        chatTargetUrl,
      });
    }

    return inertia.render('chat', props);
  }

  async sendMessage({ auth, request, response }: HttpContext) {
    const { content, params } = await request.validateUsing(messageForm);
    const senderId = auth.user!.id;
    const message = await this.messageService.sendMessage(
      senderId,
      params.targetId,
      content
    );
    transmit.broadcast(
      this.generateChatTargetUrl(params.targetId, senderId),
      message.serialize()
    );
    transmit.broadcast(
      this.generateChatTargetUrl(senderId, params.targetId),
      message.serialize()
    );

    return response.json({
      message,
    });
  }

  private generateChatTargetUrl(firstUser: User['id'], secondUser: User['id']) {
    return `/chat/${firstUser}/${secondUser}`;
  }
}
