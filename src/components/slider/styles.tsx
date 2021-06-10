import { SliderInput } from '@reach/slider';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';

import { color, transition } from '@/styles/theme';

export const StyledInput = styled(SliderInput, { shouldForwardProp: isPropValid })<{
  isMoving?: boolean;
}>`
  --slider-background: var(--background, #fff);

  &[data-reach-slider-input][data-orientation='horizontal'] {
    height: 2px;
  }

  &[data-reach-slider-input][data-orientation='vertical'] {
    width: 2px;
  }

  [data-reach-slider-range] {
    height: 10px;
    background: ${color.primary()};
  }

  [data-reach-slider-track] {
    background: ${color.gray(2)};
  }

  [data-reach-slider-handle] {
    --focus-shadow: 0 0 0 4px transparent;

    background: var(--slider-background);
    box-shadow: inset 0 0 0 ${({ isMoving }) => (isMoving ? '6px' : '2px')} ${color.primary()},
      0 0 0 2px var(--slider-background), var(--focus-shadow);
    outline: none;

    ${transition.default('box-shadow')}

    &:focus:focus-visible {
      --focus-shadow: 0 0 0 4px ${color.primary()};
    }
  }
`;
