import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from '@inertiajs/react';
import { rgba, RoundedImage } from '@minimalstuff/ui';
import { Message, User } from '~/types/app';

const UserContainer = styled.li(({ theme }) => ({
  '&:not(:first-child)': {
    borderTop: `1px solid ${rgba(theme.colors.grey.default, 0.5)}`,
  },
}));

const UserStyle = styled(Link)({
  width: '100%',
  paddingBlock: '1em',
  display: 'flex',
  gap: '1em',
});

const UsernameStyle = styled.span<{ center?: boolean }>(
  ({ theme, center = false }) => ({
    color: theme.colors.font,
    display: 'flex',
    justifyContent: center ? 'center' : 'space-between',
    flexDirection: 'column',
  })
);

export default function UserItem({
  user: { id, username, avatar },
  lastMessage,
}: {
  user: User;
  lastMessage?: Message;
}) {
  const theme = useTheme();
  return (
    <UserContainer key={id}>
      <UserStyle href={`/chat/${id}`}>
        <RoundedImage src={avatar} size={40} />
        <UsernameStyle center={!lastMessage}>
          <span css={{ fontSize: '0.9rem!important' }}>{username}</span>
          {lastMessage && (
            <span
              css={{
                fontSize: '0.85rem!important',
                color: theme.colors.grey.default,
              }}
            >
              {lastMessage.senderId !== id ? 'You' : username}:{' '}
              {lastMessage.content}
            </span>
          )}
        </UsernameStyle>
      </UserStyle>
    </UserContainer>
  );
}
