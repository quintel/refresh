import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { color, rounded, space, textSize, transition } from '@/styles/theme';

export type LegendItemVariant = 'box' | 'line';

export const LegendWrapper = styled.div`
  ${textSize('xs')}

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 1rem 1rem;
  user-select: none;
`;

export const LegendItem = styled.button<{
  hidden?: boolean;
  interactive?: boolean;
  variant?: LegendItemVariant;
}>`
  align-items: center;
  border-radius: 4px;
  display: inline-flex;
  margin-bottom: ${space(4)};
  padding: ${space(4)} ${space(6)};

  ${transition.default(['background', 'opacity'])}

  &::before {
    background: var(--series-color, transparent);
    border-radius: ${rounded('sm')};
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 10%);
    content: ' ';
    display: inline-block;
    height: 11px;
    vertical-align: middle;
    margin-right: ${space(4)};
    margin-top: -1px;
    width: 11px;
  }

  &:focus:not(:focus-visible) {
    outline: 0;
  }

  ${({ hidden }) =>
    hidden &&
    css`
      opacity: 0.4;
    `}

  ${({ interactive }) =>
    interactive &&
    css`
      cursor: pointer;

      &:hover {
        background: ${color.gray(1)};
      }

      &:active {
        background: ${color.gray(2)};
      }
    `}

  ${({ variant }) =>
    variant === 'line' &&
    css`
      &::before {
        border-radius: 0;
        box-shadow: none;
        height: 2px;
      }
    `}
`;
