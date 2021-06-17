import { Global, css } from '@emotion/react';

import inter from './inter';
import overrides from './overrides';
import reset from './reset';
import { sm } from '../typography';
import { color } from '../theme';

const globalStyles = css`
  ${reset}
  ${inter}
  ${overrides}

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
    ${sm}
  }

  a {
    color: ${color.primary(6)};

    &:hover {
      text-decoration: underline;
    }

    &:active {
      color: ${color.text};
    }
  }
`;

export default function GlobalStyles(): React.ReactElement {
  return <Global styles={globalStyles} />;
}
