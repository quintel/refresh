import Color from 'color';
import { css } from '@emotion/react';
import { DialogOverlay as ReachOverlay } from '@reach/dialog';
import { AnimatePresence, motion } from 'framer-motion';

import { color, transition } from '@/styles/theme';

const overlayCSS = css`
  &[data-reach-dialog-overlay] {
    background: ${Color(color.gray(9)).fade(0.66).toString()};
  }
`;

const AnimatedOverlay = motion(ReachOverlay);

export default function DialogOverlay(
  props: React.ComponentProps<typeof AnimatedOverlay>
): React.ReactElement {
  return (
    <AnimatePresence>
      {props.isOpen && (
        <AnimatedOverlay
          {...props}
          initial={{ opacity: 0 }}
          exit={{
            opacity: 0,
            transition: { ...transition.framerTransition(0.5) },
          }}
          animate={{ opacity: 1 }}
          transition={transition.framerTransition(0.2)}
          css={overlayCSS}
        />
      )}
    </AnimatePresence>
  );
}
