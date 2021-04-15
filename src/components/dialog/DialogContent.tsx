import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { DialogContent as ReachContent } from '@reach/dialog';

import { breakpoint, rounded, shadow, space, transition } from '@/styles/theme';

const StyledContent = motion(styled(ReachContent)`
  &[data-reach-dialog-content] {
    border-radius: ${rounded()};
    box-shadow: ${shadow.xl};
    padding: ${space(32)};
    position: relative;
    width: 100%;
  }

  ${breakpoint.xs} {
    &[data-reach-dialog-content] {
      width: 70vw;
    }
  }
`);

type CommonProps = React.ComponentProps<typeof StyledContent>;

type AriaProps =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string };

type DialogContentProps = CommonProps & AriaProps;

export default function DialogContent(props: DialogContentProps): React.ReactElement {
  return (
    <StyledContent
      {...props}
      initial={{ opacity: 0, scale: 0.9 }}
      exit={{
        opacity: 0,
        scale: 0.9,
        transition: { ...transition.framerTransition(0.3) },
      }}
      animate={{ opacity: 1, scale: 1 }}
      transition={transition.framerTransition(0.2)}
    />
  );
}
