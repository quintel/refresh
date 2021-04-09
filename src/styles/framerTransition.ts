/**
 * Creates a config object which may be supplied to Framer, animating the properties with the chosen
 * duration.
 */
export default function framerTransition(
  duration = 0.175
): { duration: number; ease: [number, number, number, number] } {
  return {
    duration,
    ease: [0.4, 0, 0.2, 1],
  };
}
