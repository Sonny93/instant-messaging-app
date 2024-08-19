import Message from '#models/message';
import User from '#models/user';

export default class MessageService {
  getMessages(firstUser: User['id'], secondUser: User['id']) {
    const messagesQuery = Message.query()
      .select('*')
      .where('sender_id', firstUser)
      .andWhere('target_id', secondUser)
      .orWhere('sender_id', secondUser)
      .andWhere('target_id', firstUser);

    return messagesQuery;
  }

  sendMessage(
    senderId: User['id'],
    targetId: User['id'],
    content: Message['content']
  ) {
    return Message.create({
      senderId,
      targetId,
      content,
    });
  }

  async getConversationsOfUser(userId: User['id']) {
    const users = await Message.query()
      .select('sender_id', 'target_id')
      .where('sender_id', userId)
      .orWhere('target_id', userId)
      .distinct();

    const userIds = new Set<number>();

    users.forEach((message) => {
      if (message.senderId !== userId) {
        userIds.add(message.senderId);
      }
      if (message.targetId !== userId) {
        userIds.add(message.targetId);
      }
    });

    return await User.query().whereIn('id', Array.from(userIds));
  }
}
