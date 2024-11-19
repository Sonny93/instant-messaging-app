import styled from '@emotion/styled';
import UnstyledList from '~/components/common/unstyled_list';

const VerticalList = styled(UnstyledList)({
  display: 'flex',
  flex: 1,
  gap: '.35em',
  flexDirection: 'column',
});

export default VerticalList;
