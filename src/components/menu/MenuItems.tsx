import { MenuItems as ReachMenuItems, MenuPopover, useMenuButtonContext } from '@reach/menu-button';
import { positionRight } from '@reach/popover';

import { AnimatePresence, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { transition } from '@/styles/theme';
import shadows from '@/styles/shadows';
import { indigo } from '@/styles/colors';
import { sm } from '@/styles/typography';

interface MenuItemsProps {
  position?: 'left' | 'right';
}

const ItemsWrapper = styled(motion.div)`
  /* Ensure menu is on top of the button when the button is :active. */
  position: relative;
  z-index: 10;
`;

const StyledMenuItems = styled(ReachMenuItems)<MenuItemsProps>`
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), ${shadows.lg};
  min-width: 12rem;
  outline: none;
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;

  &[data-reach-menu-items] {
    /* Higher specificity to override default Reach styles. */
    border: 0;
    padding: 0.5rem 0;
  }

  [data-reach-menu-item] {
    ${sm}

    display: block;
    padding: 0.25rem 1rem;
    text-align: left;
    width: 100%;

    &[data-selected] {
      background-color: ${indigo[5]};
      color: #fff;
    }
  }

  &::before {
    background: #fff;
    border-radius: 2px;
    box-shadow: -1px -1px 0 0 rgba(0, 0, 0, 0.15);
    content: ' ';
    height: 0.625rem;
    position: absolute;
    top: -0.3125rem;
    transform: rotate(45deg);
    width: 0.625rem;

    ${({ position }) =>
      position === 'right'
        ? css`
            right: 0.5rem;
          `
        : css`
            left: 0.5rem;
          `}
  }
`;

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
          <ItemsWrapper
            initial={{ opacity: 0, scale: 0.9, y: '-10px' }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: '5px',
              transition: transition.framerTransition(0.4),
            }}
            animate={{ opacity: 1, scale: 1, y: '0px' }}
            transition={transition.framerTransition(0.2)}
          >
            <StyledMenuItems position={position} {...props}>
              {children}
            </StyledMenuItems>
          </ItemsWrapper>
        </MenuPopover>
      )}
    </AnimatePresence>
  );
}
