import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { color, space, transition } from '@/styles/theme';

export const SliderContainer = styled.div`
  --background: ${color.white};
  max-width: 600px;
`;

export const SliderRow = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;

  output {
    margin-right: ${space(8)};
    text-align: right;
    width: 75px;
  }
`;

export const SliderWidgetWrapper = styled.div`
  flex: 1;
  padding: 0 ${space(10)};
  max-width: 600px;
`;

export const SliderName = styled.div`
  width: 150px;
`;

export const SliderButton = styled.button<{ hoverOnly?: boolean }>`
  --color: ${color.gray(4)};

  align-items: center;
  border-radius: 50%;
  box-shadow: inset 0 0 0 2px var(--color);
  color: var(--color);
  display: inline-flex;
  height: ${space(20)};
  justify-content: center;
  width: ${space(20)};

  ${transition.default(['background', 'box-shadow', 'color', 'opacity'])}

  &:not([disabled]):hover {
    --color: ${color.gray(5)};
  }

  &:not([disabled]):active {
    --color: ${color.gray(6)};
  }

  &:focus {
    outline: none;
  }

  &:focus:focus-visible {
    --color: ${color.primary()};
  }

  &[disabled] {
    cursor: default;
    opacity: 0.5;
  }

  & + & {
    margin-left: ${space(4)};
  }

  /**
 * A variant of the SliderButton which is only shown when the user mouses over the slider
 * container element.
 *
 * Reduces visual noise by hiding buttons which are less commonly used.
 */
  ${({ hoverOnly }) =>
    hoverOnly &&
    css`
      opacity: 0;

      &[disabled] {
        opacity: 0;
      }

      ${SliderContainer}:hover & {
        opacity: 1;

        &[disabled] {
          opacity: 0.5;
        }
      }
    `}
`;
