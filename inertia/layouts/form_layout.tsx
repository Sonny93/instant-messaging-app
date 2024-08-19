import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import BaseLayout from '~/layouts/_base_layout';

const FormLayoutStyle = styled.div(({ theme }) => ({
  height: 'fit-content',
  width: theme.medias.mobile,
  maxWidth: '100%',
  marginTop: '10em',
  paddingInline: '1em',
  display: 'flex',
  gap: '0.75em',
  flexDirection: 'column',
}));

const FormLayout = ({ children }: PropsWithChildren) => (
  <BaseLayout>
    <FormLayoutStyle>{children}</FormLayoutStyle>
  </BaseLayout>
);

export default FormLayout;
