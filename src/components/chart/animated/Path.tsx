// import { forwardRef } from 'react';

// import styled from '@emotion/styled';
// import { Li } from '@visx/shape';
import { motion } from 'framer-motion';

import { transition } from '@/styles/theme';
import React from 'react';

// type StyleProps = {
//   dimmed?: boolean;
// };

// const StyledBar = styled(Bar, {
//   shouldForwardProp: (prop: string) => prop !== 'dimmed',
// })<StyleProps>`
//   ${transition.default('opacity')}
//   ${({ dimmed }) => dimmed && 'opacity: 0.3;'}
// `;

// const AnimatedPath = motion.path;
// motion(
//   // eslint-disable-next-line react/display-name
//   forwardRef(
//     (
//       props: React.ComponentProps<typeof Bar> & StyleProps,
//       ref: React.ForwardedRef<SVGRectElement>
//     ) => {
//       return <StyledBar {...props} innerRef={ref} />;
//     }
//   )
// );

{
  /* <motion.path
key={`stack-${stack.key}`}
initial={{
  d: path(stack) || '',
  opacity: seriesOpacity(stack.key, 0.8),
}}
animate={{
  d: path(stack) || '',
  opacity: seriesOpacity(stack.key, 0.8),
}}
transition={transition.framerTransition()}
stroke="transparent"
fill={colorScale(stack.key)}
onMouseOver={() => {
  fixateSeries(stack.key);
}}
onMouseOut={() => fixateSeries()}
/ */
}

type Props = React.ComponentProps<typeof motion.path> & {
  css?: never;
  d?: string;
  opacity?: string | number;
};

export default function AnimatedPath({ d, opacity, ...pathProps }: Props): React.ReactElement {
  return (
    <motion.path
      initial={{ d, opacity }}
      animate={{ d, opacity }}
      transition={transition.framerTransition()}
      {...pathProps}
    />
  );
}
