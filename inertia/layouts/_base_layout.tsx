import { ThemeContextProvider } from '@minimalstuff/ui';
import { PropsWithChildren } from 'react';

const BaseLayout = ({ children }: PropsWithChildren) => (
  <ThemeContextProvider>{children}</ThemeContextProvider>
);
export default BaseLayout;
