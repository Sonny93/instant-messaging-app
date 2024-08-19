import styled from '@emotion/styled';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import CreateMessageForm from '~/components/chat/send_message_form';
import { TargetUserContextProvider } from '~/contexts/target_user_context';
import { TransmitContextProvider } from '~/contexts/transmit_context';
import useSubscribe from '~/hooks/use_subscribe';
import type { Message, User } from '~/types/app';

const Container = styled.div(({ theme }) => ({
  width: theme.medias.tablet,
  display: 'flex',
  justifyContent: 'center',
}));

const SideSection = styled.aside({
  widrh: '300px',
});

const ContentSection = styled.main({
  height: '100%',
  flex: 1,
});

export default function ChatPage({
  conversations,
  messages,
  users,
  targetUser,
  chatTargetUrl,
}: {
  conversations: User[];
  messages?: Message[];
  users: User[];
  targetUser: User;
  targetId: User['id'];
  chatTargetUrl?: string;
}) {
  return (
    <TransmitContextProvider>
      <TargetUserContextProvider targetUser={targetUser}>
        <Container>
          <SideSection>
            {conversations.length === 0 && <p>no conversation yet</p>}
            <ul>
              {[conversations, users].flat().map((user) => (
                <li key={user.id}>
                  <Link href={`/chat/${user.id}`}>{user.username}</Link>
                </li>
              ))}
            </ul>
          </SideSection>
          <ContentSection>
            {!targetUser && <p>Select a conversation</p>}
            {messages && targetUser && (
              <Messages chatTargetUrl={chatTargetUrl!} messages={messages} />
            )}
            {targetUser && <CreateMessageForm targetUser={targetUser} />}
          </ContentSection>
          <SideSection>// user's info</SideSection>
        </Container>
      </TargetUserContextProvider>
    </TransmitContextProvider>
  );
}

function Messages(props: { messages: Message[]; chatTargetUrl: string }) {
  const [messages, setMessages] = useState<Message[]>(props.messages);
  useSubscribe<Message>(props.chatTargetUrl, (newMessage) =>
    setMessages((prevMessages) => {
      const messagesCopy = [...prevMessages, newMessage];
      return messagesCopy;
    })
  );

  return (
    <ul css={{ listStyle: 'none' }}>
      {messages?.map((message) => <li key={message.id}>{message.content}</li>)}
    </ul>
  );
}
