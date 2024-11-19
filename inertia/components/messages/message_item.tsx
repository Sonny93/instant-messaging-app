import styled from '@emotion/styled';
import { rgba } from '@minimalstuff/ui';
import { Message } from '~/types/app';

type MessageStyleProps = { isCurrentUser: boolean };

const MessageStyle = styled.li<MessageStyleProps>(
  ({ theme, isCurrentUser }) => {
    const common = {
      width: 'fit-content',
      padding: '1em!important',
      borderRadius: theme.borders.radius.xl,
    };
    if (isCurrentUser) {
      return {
        ...common,
        marginLeft: 'auto!important',
        backgroundColor: rgba(theme.colors.blue.default, 0.5),
      };
    }
    return { ...common, backgroundColor: rgba(theme.colors.black, 0.5) };
  }
);

const MessageItem = ({
  content,
  isCurrentUser,
}: Message & MessageStyleProps) => (
  <MessageStyle isCurrentUser={isCurrentUser}>{content}</MessageStyle>
);

export default MessageItem;
