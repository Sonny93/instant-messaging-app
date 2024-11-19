import { useState } from 'react';
import VerticalList from '~/components/common/vertical_list';
import UserItem from '~/components/users/user_item';
import { User } from '~/types/app';

export default function UserList(props: { users: User[] }) {
  const [users, setUsers] = useState<User[]>(props.users);

  return (
    <VerticalList>
      {users.map((user) => (
        <UserItem user={user} key={user.id} />
      ))}
    </VerticalList>
  );
}
