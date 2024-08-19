import { SharedProps } from '@adonisjs/inertia/types';
import styled from '@emotion/styled';
import { Link, useForm } from '@inertiajs/react';
import { Button, Form, Textbox } from '@minimalstuff/ui';
import { FormEvent, ReactNode } from 'react';
import FormLayout from '~/layouts/form_layout';
import { rgba } from '~/lib/colors';

const ErrorMessage = styled.p(({ theme }) => ({
  border: `1px solid ${theme.colors.red.default}`,
  backgroundColor: rgba(theme.colors.red.lightest, 0.1),
  color: theme.colors.red.default,
  borderRadius: theme.borders.radius.m,
  padding: '1em',
}));

function LoginPage({ error }: SharedProps) {
  const { data, setData, errors, post } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    post('/login');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && <ErrorMessage>{error}</ErrorMessage>}
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
        onChange={setData}
        value={data.password}
        errors={[errors?.password!]}
      />
      <Button type="submit">Login</Button>
      <Link href="/signin">Signin</Link>
    </Form>
  );
}

LoginPage.layout = (page: ReactNode) => <FormLayout children={page} />;
export default LoginPage;
