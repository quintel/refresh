import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({ prepend: true, key: 'css' });

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <CacheProvider value={cache}>
      <Story />
    </CacheProvider>
  ),
];
