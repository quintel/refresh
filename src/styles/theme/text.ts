import createFetcher from './createFetcher';

type TypographyRule = {
  fontSize: string;
  lineHeight?: string;
};

/**
 * Returns rules to set the font size, with an appropriate line-height.
 *
 * This helper should not be used as a value for the font-size property (use `fontSize` for this),
 * since it returns values for multiple properties.
 *
 * @example Using text
 *   css`
 *     ${text('sm')}
 *   `;
 */
const text = createFetcher({
  xs: {
    fontSize: '0.75rem',
    lineHeight: '1rem',
  } as TypographyRule,

  sm: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  } as TypographyRule,

  base: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  } as TypographyRule,

  lg: {
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
  } as TypographyRule,

  xl: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
  } as TypographyRule,

  xl2: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
  } as TypographyRule,

  xl3: {
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
  } as TypographyRule,

  xl4: {
    fontSize: '2.25rem',
    lineHeight: '2.5rem',
  } as TypographyRule,
});

export default text;

/**
 * Returns the font-size value which would be returned by `text` for the chosen size.
 *
 * @example Using fontSize as a property value
 *   css`
 *     font-size: ${fontSize('sm')};
 *   `;
 */
export function fontSize(...args: Parameters<typeof text>): TypographyRule['fontSize'] {
  return text(...args).fontSize;
}

/**
 * Font faces.
 */
export const fontFamily = {
  sansSerif:
    "'Inter var', 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, " +
    'Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',

  monospace: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
};
