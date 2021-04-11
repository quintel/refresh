type Keys<T> = keyof T;
type Values<T> = T[keyof T];

/**
 * Receives an object and returns a function which when invoked with a key from the object, will
 * return the value.
 *
 * This is essentially syntactic sugar around `object[someKey]`, which will allow us to change the
 * implementation alter.
 *
 * @example
 *   const map = createFetcherWithDefault({ a: 1, b: 2, c: 3 });
 *   map('c') // => 3
 */
export default function createFetcher<T>(obj: T): (index: Keys<T>) => Values<T> {
  return function fetchThemeValue(index) {
    return obj[index];
  };
}

/**
 * A version of createFetcher where the returned function may be called without a key, in which case
 * the default value is returned instead.
 *
 * @example
 *   const map = createFetcherWithDefault({ a: 1, b: 2, c: 3 }, 'b');
 *   map() // => 2
 *
 * @see createFetcher
 */
export function createFetcherWithDefault<T>(obj: T, def: Keys<T>): (index?: Keys<T>) => Values<T> {
  return function fetchThemeValueWithFallback(index?) {
    return index !== undefined ? obj[index] : obj[def];
  };
}
