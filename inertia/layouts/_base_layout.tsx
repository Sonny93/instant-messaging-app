import { Global } from '@emotion/react';
import { ThemeContextProvider } from '@minimalstuff/ui';
import { PropsWithChildren } from 'react';

const BaseLayout = ({ children }: PropsWithChildren) => (
  <ThemeContextProvider>
    <Global
      styles={{
        '*': {
          fontSize: '16px !important',
        },
      }}
    />
    {children}
  </ThemeContextProvider>
);
export default BaseLayout;
