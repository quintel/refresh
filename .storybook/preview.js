import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import GlobalStyles from '../src/styles/GlobalStyles';

const cache = createCache({ prepend: true, key: 'css' });

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <CacheProvider value={cache}>
      <GlobalStyles />
      <Story />
    </CacheProvider>
  ),
];
