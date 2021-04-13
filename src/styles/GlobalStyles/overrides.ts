import { css } from '@emotion/react';

export default css`
  [data-reach-menu][hidden],
  [data-reach-menu-popover][hidden] {
    display: block !important;
    pointer-events: none !important;
  }
`;
