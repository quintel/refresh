import { forwardRef } from 'react';

import styled from '@emotion/styled';
import { Bar } from '@visx/shape';
import { motion } from 'framer-motion';

import { transition } from '@/styles/theme';

type StyleProps = {
  dimmed?: boolean;
};

const StyledBar = styled(Bar)<StyleProps>`
  ${transition.default('opacity')}
  ${({ dimmed }) => dimmed && 'opacity: 0.3;'}
`;

const AnimatedBar = motion(
  // eslint-disable-next-line react/display-name
  forwardRef(
    (
      props: React.ComponentProps<typeof Bar> & StyleProps,
      ref: React.ForwardedRef<SVGRectElement>
    ) => {
      return <StyledBar {...props} innerRef={ref} />;
    }
  )
);

export default AnimatedBar;
