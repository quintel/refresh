import CloseButton from './CloseButton';
import DialogContent from './DialogContent';
import DialogOverlay from './DialogOverlay';

import styled from '@emotion/styled';
import { space, textSize } from '@/styles/theme';

const DialogHeader = styled.h3`
  font-weight: 500;
  margin-bottom: ${space(16)};

  ${textSize('lg')}
`;

type CommonProps = {
  children: React.ReactNode;
  /**
   * Can the dialog be dismissed by the user clicking outside the content? This defaults to true,
   * but may be set to false when action is required by the user before proceeding.
   */
  isDismissable?: boolean;
  /**
   * Is the dialog visible?
   */
  isOpen?: boolean;
  /**
   * Mandatory callback function triggered when the user clicks the close button.
   */
  onClose: () => void;
} & React.ComponentProps<typeof DialogContent>;

// Dialog requires that either an aria-label, aria-labelledby, or title prop is provided. When a
// title is present, both the ARIA attributes may be omitted. When there is no title, one of the
// ARIA attributes must be present.
type AriaProps =
  | { 'aria-label': string; 'aria-labelledby'?: never; title?: string }
  | { 'aria-label'?: string; 'aria-labelledby'?: never; title: string }
  | { 'aria-label'?: never; 'aria-labelledby': string; title?: string };

type DialogProps = CommonProps & AriaProps;

/**
 * Creates a modal dialog which fills the browser.
 *
 * Sets up a default close button and title styles. Use DialogOverlay and DialogContent when you
 * need custom styles or behavior.
 *
 * @example
 *   const { isOpen, onClose, onOpen } = useDialog();
 *   return <Dialog isOpen={isOpen} onClose={onClose} />;
 */
export default function Dialog({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  children,
  onClose,
  isDismissable = true,
  size = 'lg',
  title,
  ...rest
}: DialogProps): React.ReactElement {
  const ariaProps =
    ariaLabel || title
      ? { 'aria-label': title || (ariaLabel as string) }
      : { 'aria-labelledby': ariaLabelledby as string };

  return (
    <DialogOverlay {...rest} onDismiss={isDismissable ? onClose : undefined}>
      <DialogContent {...ariaProps} size={size}>
        {title && <DialogHeader>{title}</DialogHeader>}

        {children}

        {/* Close button goes last so that buttons within children are focused by default. */}
        {isDismissable && <CloseButton onClick={onClose} />}
      </DialogContent>
    </DialogOverlay>
  );
}
