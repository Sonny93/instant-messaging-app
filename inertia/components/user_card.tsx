import styled from '@emotion/styled';
import { RoundedImage } from '@minimalstuff/ui';
import useUser from '~/hooks/use_user';

const UserCardStyle = styled.div({
  width: '100%',
  marginBottom: '2em',
  display: 'flex',
  gap: '1em',
  alignItems: 'center',
});

export default function UserCard() {
  const { user, isAuthenticated } = useUser();
  if (!isAuthenticated) return <></>;

  return (
    <UserCardStyle>
      <RoundedImage src={user.avatar} size={40} />
      <span>{user.username}</span>
    </UserCardStyle>
  );
}
