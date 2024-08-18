import { Head } from '@inertiajs/react';
import { Textbox } from '@minimalstuff/ui';
import { useState } from 'react';

export default function Home(props: { version: number }) {
  const [str, setStr] = useState<string>('');
  return (
    <>
      <Head title="Homepage" />

      <div css={{ padding: '1em' }}>
        <h1>AdonisJS {props.version} x Inertia x React</h1>

        <Textbox
          label="My checkbox"
          name="test"
          onChange={(_, value) => setStr(value)}
          value={str}
        />
        <p>Value: {str}</p>
      </div>
    </>
  );
}
