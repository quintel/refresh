import createFetcher, { createFetcherWithDefault } from './createFetcher';

describe('createFetcher', () => {
  it('returns an initialized value with a string key', () => {
    expect(createFetcher({ a: 1, b: 2, c: 3 })('b')).toEqual(2);
  });

  it('returns an initialized value with a numeric key', () => {
    expect(createFetcher({ 0: 0, 1: 10, 2: 20 })(1)).toEqual(10);
  });

  it('returns an initialized value with a numeric key equalling zero', () => {
    expect(createFetcher({ 0: 0, 1: 10, 2: 20 })(0)).toEqual(0);
  });
});

describe('createFetcherWithDefault', () => {
  it('returns an initialized value with a string key', () => {
    expect(createFetcherWithDefault({ a: 1, b: 2, c: 3 }, 'c')('b')).toEqual(2);
  });

  it('returns an initialized value with a numeric key', () => {
    expect(createFetcherWithDefault({ 0: 0, 1: 10, 2: 20 }, 2)(1)).toEqual(10);
  });

  it('returns an initialized value with a numeric key equalling zero', () => {
    expect(createFetcherWithDefault({ 0: 0, 1: 10, 2: 20 }, 2)(0)).toEqual(0);
  });

  it('returns the default when no key is provided', () => {
    expect(createFetcherWithDefault({ 0: 0, 1: 10, 2: 20 }, 2)()).toEqual(20);
  });
});
