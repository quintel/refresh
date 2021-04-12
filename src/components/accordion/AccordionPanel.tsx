import { AccordionPanel as ReachPanel, useAccordionItemContext } from '@reach/accordion';
import AnimatedPanel from '../disclosure/AnimatedPanel';

/**
 * Provides an animated version of Reach UI's DisclosurePanel.
 *
 * Customises some of the styles and applies animations such that when closed then panel has zero
 * height and opacity, and when opened the height and opacity return to 100%.
 *
 * An inner DIV is used to wrap the panel contents in order determine their height. Be wary of
 * setting height-altering styles on the DisclosurePanel itself (such as padding or borders). Prefer
 * instead to wrap the children in another element which will set such styles, or ensure that the
 * panel `box-sizing` is set to "content-box" (this is the default for DisclosurePanel).
 */
export default function AccordionPanel(
  props: React.ComponentPropsWithoutRef<typeof ReachPanel>
): React.ReactElement {
  const { isExpanded: open } = useAccordionItemContext();
  return <AnimatedPanel {...props} open={open} component={ReachPanel} />;
}
