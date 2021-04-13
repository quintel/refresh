import { MenuButton as ReachMenuButton } from '@reach/menu-button';
import { css } from '@emotion/react';

import Arrow from './Arrow';

const buttonCSS = css`
  align-items: center;
  display: align-flex;
`;

export default function MenuButton({
  children,
  ...rest
}: React.ComponentProps<typeof ReachMenuButton>): React.ReactElement {
  return (
    <ReachMenuButton {...rest} css={buttonCSS}>
      {children} <Arrow />
    </ReachMenuButton>
  );
}
