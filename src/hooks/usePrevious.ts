import { useEffect, useRef } from 'react';

/**
 * Returns the previous value of state. Returns a new value only when the value changes.
 *
 * https://usehooks.com/usePrevious/ - License: unlicense
 *
 * @example
 *   const [count, setCount] = useState(0);
 *   const previousCount = usePrevious(count);
 */
export default function usePrevious<T>(value: T): T | undefined {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
