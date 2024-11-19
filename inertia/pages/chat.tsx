import styled from '@emotion/styled';
import { rgba, RoundedImage } from '@minimalstuff/ui';
import CreateMessageForm from '~/components/chat/send_message_form';
import MessageList from '~/components/messages/message_list';
import UserCard from '~/components/user_card';
import UserList from '~/components/users/user_list';
import { TargetUserContextProvider } from '~/contexts/target_user_context';
import { TransmitContextProvider } from '~/contexts/transmit_context';
import type { Message, User } from '~/types/app';
import bgImage from '../images/background.jpg';

const Background = styled.div({
  height: '100%',
  width: '100%',
  backgroundImage: `url(${bgImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

const Container = styled.div(({ theme }) => ({
  height: '100%',
  width: theme.medias.small_desktop,
  maxWidth: '100%',
  backgroundColor: rgba(theme.colors.background, 0.65),
  backdropFilter: 'blur(.75em)',
  margin: '3em',
  borderRadius: '10px',
  display: 'flex',
  gap: '1.5em',
  justifyContent: 'center',
}));

const SideSection = styled.aside({
  width: '300px',
  padding: '1em',
});

const LeftSection = styled(SideSection)(({ theme }) => ({
  borderRight: `1px solid ${rgba(theme.colors.grey.default, 0.5)}`,
}));

const RightSection = styled(SideSection)(({ theme }) => ({
  borderLeft: `1px solid ${rgba(theme.colors.grey.default, 0.5)}`,
}));

const ContentSection = styled.main({
  height: '100%',
  minWidth: '400px',
  paddingBlock: '1em',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
});

const ChatPage = ({
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
}) => (
  <TransmitContextProvider>
    <TargetUserContextProvider targetUser={targetUser}>
      <Background>
        <Container>
          <LeftSection>
            <UserCard />
            {conversations.length === 0 && <p>no conversation yet</p>}
            <UserList users={[conversations, users].flat()} />
          </LeftSection>
          <ContentSection>
            {!targetUser && <p>Select a conversation</p>}
            {messages && targetUser && (
              <MessageList chatTargetUrl={chatTargetUrl!} messages={messages} />
            )}
            {targetUser && <CreateMessageForm targetUser={targetUser} />}
          </ContentSection>
          {targetUser && (
            <RightSection>
              <RoundedImage
                src={targetUser.avatar}
                size={96}
                css={{ margin: '2em auto', display: 'block' }}
              />
              <p
                css={{
                  fontSize: '1.15rem !important',
                  textAlign: 'center',
                  letterSpacing: '1px',
                }}
              >
                {targetUser.username}
              </p>
            </RightSection>
          )}
        </Container>
      </Background>
    </TargetUserContextProvider>
  </TransmitContextProvider>
);

export default ChatPage;
