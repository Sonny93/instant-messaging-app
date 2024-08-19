import { useForm } from '@inertiajs/react';
import { Button, Textbox } from '@minimalstuff/ui';
import { FormEvent, useCallback, useMemo } from 'react';
import { User } from '~/types/app';

export default function CreateMessageForm({
  targetId,
}: {
  targetId: User['id'];
}) {
  const { data, setData, reset, post, processing, errors } = useForm({
    content: '',
  });
  const isFormDisabled = useMemo(
    () => processing || data.content.length === 0,
    [processing, data]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await post(`/chat/${targetId}`);
      reset();
    },
    [data]
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
        placeholder={`Send a message to @${targetId}`}
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
