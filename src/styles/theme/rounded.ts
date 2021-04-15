import { createFetcherWithDefault } from './createFetcher';

export default createFetcherWithDefault(
  {
    sm: '0.125rem',
    base: '0.25rem',
    lg: '0.5rem',
    xl: '1rem',
  },
  'base'
);
