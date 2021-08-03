import { forwardRef } from 'react';

import { Bar } from '@visx/shape';
import { motion } from 'framer-motion';

const AnimatedBar = motion(
  // eslint-disable-next-line react/display-name
  forwardRef((props: React.ComponentProps<typeof Bar>, ref: React.ForwardedRef<SVGRectElement>) => {
    return <Bar {...props} innerRef={ref} />;
  })
);

export default AnimatedBar;
