import { useForm } from '@inertiajs/react';
import { Button, Form, Textbox } from '@minimalstuff/ui';
import { FormEvent, useMemo } from 'react';
import { makeRequest } from '~/lib/request';
import { User } from '~/types/app';

export default function SendMessageForm({ targetUser }: { targetUser: User }) {
  const { data, setData, reset, processing, errors } = useForm({
    content: '',
  });
  const isFormDisabled = useMemo(
    () => processing || data.content.length === 0,
    [processing, data]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await makeRequest({
      url: `/chat/${targetUser.id}`,
      method: 'post',
      body: data,
    });
    // data is updated but visually nothing change, maybe the issue is the textbox component
    reset();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      css={{
        display: 'flex',
        gap: '.35em',
        alignItems: 'center',
        justifyContent: 'center',
        '& > *': {
          width: '100%',
          marginBlock: '0.5em',
        },
      }}
    >
      <Textbox
        name="content"
        onChange={setData}
        value={data.content}
        placeholder={`Send a message to @${targetUser.username}`}
        maxLength={4000}
        autoFocus
      />
      {errors.content && <div>{errors.content}</div>}
      <Button css={{ display: 'none' }} type="submit" disabled={isFormDisabled}>
        send
      </Button>
    </Form>
  );
}
