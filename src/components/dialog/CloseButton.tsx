import { css } from '@emotion/react';
import { VisuallyHidden } from '@reach/visually-hidden';

import { color, space, rounded, transition, zIndex } from '@/styles/theme';

const buttonStyles = css`
  border-radius: 0 ${rounded()} 0 ${rounded()};
  color: ${color.secondary};
  padding: ${space(8)};
  position: absolute;
  right: 0;
  top: 0;
  z-index: ${zIndex.dialogClose};

  ${transition.default(['background', 'color'])}

  &:hover {
    background: ${color.gray(1)};
    color: ${color.text};
  }

  &:active {
    background: ${color.gray(2)};
    color: ${color.text};
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

export default function CloseButton({
  onClick,
  size = 20,
}: {
  /**
   * A callback function executed when the user clicks the button. This should change the state used
   * to determine whether the dialog is open.
   */
  onClick: () => void;
  size?: number;
}): React.ReactElement {
  return (
    <button onClick={onClick} css={buttonStyles}>
      <VisuallyHidden>Close</VisuallyHidden>

      <svg
        fill="none"
        height={size}
        stroke="currentColor"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
