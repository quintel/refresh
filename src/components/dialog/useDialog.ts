import { useCallback, useState } from 'react';

export default function useDialog(
  defaultOpen = false
): { isOpen: boolean; onClose: () => void; onOpen: () => void } {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return { isOpen, onClose, onOpen };
}
