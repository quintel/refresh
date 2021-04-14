import { AnimatePresence, motion } from 'framer-motion';
import { MenuItems as ReachMenuItems, MenuPopover, useMenuButtonContext } from '@reach/menu-button';
import { positionRight } from '@reach/popover';
import cn from 'clsx';

import framerTransition from '@/styles/framerTransition';
import styles from './Menu.module.scss';

interface MenuItemsProps {
  position?: 'left' | 'right';
}

export default function MenuItems({
  children,
  position,
  ...props
}: React.ComponentProps<typeof ReachMenuItems> & MenuItemsProps): React.ReactElement {
  const { isExpanded } = useMenuButtonContext();

  return (
    <AnimatePresence>
      {isExpanded && (
        <MenuPopover position={position === 'right' ? positionRight : undefined}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: '-10px' }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: '5px',
              transition: framerTransition(0.4),
            }}
            animate={{ opacity: 1, scale: 1, y: '0px' }}
            transition={framerTransition(0.2)}
            className={styles.wrapper}
          >
            <ReachMenuItems
              className={cn([styles.items, { [styles.right]: position === 'right' }])}
              {...props}
            >
              {children}
            </ReachMenuItems>
          </motion.div>
        </MenuPopover>
      )}
    </AnimatePresence>
  );
}
