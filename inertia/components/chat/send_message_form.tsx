import { useForm } from '@inertiajs/react';
import { Button, Textbox } from '@minimalstuff/ui';
import { FormEvent, useCallback, useMemo } from 'react';
import { makeRequest } from '~/lib/request';
import { User } from '~/types/app';

export default function CreateMessageForm({
  targetUser,
}: {
  targetUser: User;
}) {
  const { data, setData, reset, processing, errors } = useForm({
    content: '',
  });
  const isFormDisabled = useMemo(
    () => processing || data.content.length === 0,
    [processing, data]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await makeRequest({
        url: `/chat/${targetUser.id}`,
        method: 'post',
        body: data,
      });
      reset();
    },
    [data, reset]
  );

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: 'flex',
        gap: '.35em',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Textbox
        label="Message"
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
    </form>
  );
}
