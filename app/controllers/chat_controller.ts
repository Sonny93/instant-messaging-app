import MessageService from '#services/message_service';
import { messageForm } from '#validators/message_form';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ChatController {
  constructor(protected messageService: MessageService) {}

  async showChat({ auth, request, inertia, response }: HttpContext) {
    const targetId = request.param('targetId');
    console.log(request.params());
    if (Number(targetId) === auth.user!.id) {
      return response.redirect('/chat');
    }

    const conversations = await this.messageService.getConversationsOfUser(
      auth.user!.id
    );

    const props = {
      conversations,
      targetId,
    };

    if (targetId) {
      const messages = await this.messageService.getMessages(
        auth.user!.id,
        targetId
      );
      return inertia.render('chat', { ...props, messages });
    }

    return inertia.render('chat', props);
  }

  async sendMessage({ auth, request }: HttpContext) {
    const { content, params } = await request.validateUsing(messageForm);
    return this.messageService.sendMessage(
      auth.user!.id,
      params.targetId,
      content
    );
  }
}
