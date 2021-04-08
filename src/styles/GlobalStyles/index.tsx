import { Global, css } from '@emotion/react';

import inter from './inter';
import reset from './reset';

const globalStyles = css`
  ${reset}
  ${inter}

  html {
    font-family: 'Inter var', 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 16px;
  }
  html,
  body {
    margin: 0;
    padding: 0;
  }
  body {
    font-size: 0.875rem;
  }
`;

export default function GlobalStyles(): React.ReactElement {
  return <Global styles={globalStyles} />;
}
