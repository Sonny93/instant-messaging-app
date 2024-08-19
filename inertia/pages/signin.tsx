import { Link, useForm } from '@inertiajs/react';
import { Button, Form, Textbox } from '@minimalstuff/ui';
import { FormEvent, ReactNode } from 'react';
import FormLayout from '~/layouts/form_layout';

function SigninPage() {
  const { data, setData, errors, post } = useForm({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    post('/signin');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Signin</h1>
      <Textbox
        label="Username"
        name="username"
        onChange={setData}
        value={data.username}
        errors={[errors?.username!]}
      />
      <Textbox
        label="Email"
        name="email"
        onChange={setData}
        value={data.email}
        errors={[errors?.email!]}
      />
      <Textbox
        label="password"
        name="password"
        type="password"
        onChange={setData}
        value={data.password}
        errors={[errors?.password!]}
      />
      <Textbox
        label="Password confirmation"
        name="password_confirmation"
        type="password"
        onChange={setData}
        value={data.password_confirmation}
        errors={[errors?.password_confirmation!]}
      />
      <Button type="submit">Signin</Button>
      <Link href="/login">Login</Link>
    </Form>
  );
}

SigninPage.layout = (page: ReactNode) => <FormLayout children={page} />;
export default SigninPage;
