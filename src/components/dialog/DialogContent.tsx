import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { DialogContent as ReachContent } from '@reach/dialog';

import { rounded, shadow, space, transition } from '@/styles/theme';

const sizes = {
  sm: '26rem',
  md: '32rem',
  lg: '38rem',
  xl: '44rem',
  xl2: '50rem',
  full: '100%',
};

type DialogSizeProp = { size?: keyof typeof sizes };

const StyledContent = styled(motion(ReachContent))<DialogSizeProp>`
  &[data-reach-dialog-content] {
    border-radius: ${rounded()};
    box-shadow: ${shadow.xl};
    padding: ${space(32)};
    position: relative;
    width: min(100%, var(--dialog-width));
  }
`;

type CommonProps = React.ComponentProps<typeof StyledContent> & DialogSizeProp;

type AriaProps =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string };

type DialogContentProps = CommonProps & AriaProps;

export default function DialogContent({
  size = 'lg',
  ...rest
}: DialogContentProps): React.ReactElement {
  return (
    <StyledContent
      {...rest}
      initial={{ opacity: 0, scale: 0.9 }}
      exit={{
        opacity: 0,
        scale: 0.9,
        transition: { ...transition.framerTransition(0.3) },
      }}
      animate={{ opacity: 1, scale: 1 }}
      transition={transition.framerTransition(0.2)}
      style={{ '--dialog-width': sizes[size] }}
    />
  );
}
