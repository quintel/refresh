import { css } from '@emotion/react';
import { space } from '@/styles/theme';

const arrowCSS = css`
  display: inline;
  margin-left: -${space(2)};
  margin-right: -4px;
`;

/**
 * Temporary, from Hero Icons. MIT Licensed.
 */
export default function Arrow({ size }: { size?: number }): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      width={size || 16}
      height={size || 16}
      css={arrowCSS}
    >
      <path
        fillRule="evenodd"
        // eslint-disable-next-line max-len
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}
