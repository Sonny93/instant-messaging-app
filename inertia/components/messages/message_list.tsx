import { useState } from 'react';
import VerticalList from '~/components/common/vertical_list';
import MessageItem from '~/components/messages/message_item';
import useSubscribe from '~/hooks/use_subscribe';
import useUser from '~/hooks/use_user';
import { Message } from '~/types/app';

export default function MessageList(props: {
  messages: Message[];
  chatTargetUrl: string;
}) {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>(props.messages);
  useSubscribe<Message>(props.chatTargetUrl, (newMessage) =>
    setMessages((prevMessages) => {
      const messagesCopy = [...prevMessages, newMessage];
      return messagesCopy;
    })
  );

  return (
    <VerticalList>
      {messages?.map((message) => (
        <MessageItem
          isCurrentUser={user!.id === message.senderId}
          {...message}
          key={message.id}
        />
      ))}
    </VerticalList>
  );
}
