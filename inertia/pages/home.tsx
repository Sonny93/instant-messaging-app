import { Head, Link } from '@inertiajs/react';
import useUser from '~/hooks/use_user';

export default function Home(props: { version: number }) {
  const { user, isAuthenticated } = useUser();
  return (
    <>
      <Head title="Homepage" />

      <div css={{ padding: '1em' }}>
        <h1>AdonisJS {props.version} x Inertia x React</h1>
        {isAuthenticated ? user.username : 'hello'}
        {isAuthenticated ? (
          <Link href="/logout" method="post">
            Disconnect
          </Link>
        ) : (
          <>
            <Link href="/login">Login</Link>
            or
            <Link href="/signin">Signin</Link>
          </>
        )}
      </div>
    </>
  );
}
