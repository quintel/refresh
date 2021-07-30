/**
 * AllOrNone is a type which given an object requires that all of the properties and values are
 * present, or none are. Any optional properties in the original will remain optional.
 *
 * @example
 *
 * Creates a type where `required` and `also` properties must both be provided, or neither be
 * provided. `optional` may be provided only when the other properties are.
 *
 * ```ts
 * type Props = AllOrNone<{ required: boolean; also: boolean; optional?: boolean }>
 *
 * // Allowed: { required: true, also: true }
 * // Allowed: { required: true, also: true, optional: true }
 * // Allowed: {}
 * //
 * // Not allowed: { required: true }
 * // Not allowed: { also: true }
 * ```
 *
 */
export type AllOrNone<T> = T | { [K in keyof T]?: never };
