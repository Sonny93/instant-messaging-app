import styled from '@emotion/styled';
import CreateMessageForm from '~/components/chat/send_message_form';
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

export default function ChatPage(props: {
  conversations: User[];
  messages: Message[];
  targetId: User['id'];
}) {
  return (
    <Container>
      <SideSection>
        {props.conversations.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </SideSection>
      <ContentSection>
        <ul css={{ listStyle: 'none' }}>
          {props.messages.map((message) => (
            <li key={message.id}>{message.content}</li>
          ))}
        </ul>
        <CreateMessageForm targetId={props.targetId} />
      </ContentSection>
    </Container>
  );
}
