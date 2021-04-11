import styled from '@emotion/styled';

import { color, fontSize } from '@/styles/theme';

export const SidebarWrapper = styled.nav`
  background: ${color.gray(1)};
  border-right: 1px solid ${color.gray(3)};
  width: 220px;
`;

export const SectionLabel = styled.button`
  background: ${color.gray(2)};
  border: 0;
  cursor: pointer;
  display: block;
  font-weight: bold;
  padding: 0.5rem 0;
  text-align: left;
  width: 100%;

  &:focus:not(:focus-visible) {
    outline: 0;
  }
`;

function itemLeftPadding({ depth }: { depth: number }) {
  return depth === 1
    ? `calc(${iconSize(1)}px + 1rem)`
    : `calc(${iconSize(1)}px + 1rem + ((${iconSize(2)}px + 0.25rem) * ${depth - 1}))`;
}

function itemVerticalPadding({ depth }: { depth: number }) {
  return depth === 1 ? '0.375rem' : '0.25rem';
}

/**
 * Wraps around the content for a sidebar item - the icon, label, and bar chart, but not the
 * elements for any child items.
 */
export const ItemContent = styled.a<{ active: boolean; depth: number }>`
  background: ${({ active }) => (active ? color.gray(0) : undefined)};
  display: block;
  line-height: 1.3;
  padding: ${itemVerticalPadding} 1rem ${itemVerticalPadding} ${itemLeftPadding};
`;

/**
 * Returns the size of an icon for a sidebar item at the given depth.
 */
function iconSize(depth: number) {
  return depth === 1 ? 20 : 14;
}

/**
 * Placeholder component for icons used in sidebar items.
 */
export const Icon = styled.div<{ depth: number }>`
  align-items: center;
  background: #bbb;
  border-radius: 9999px;
  display: inline-flex;
  flex-shrink: 0;
  height: ${({ depth }) => iconSize(depth)}px;
  justify-content: space-around;
  margin-top: ${({ depth }) => (depth === 1 ? '0px' : '0.125rem')};
  margin-left: calc(-${({ depth }) => iconSize(depth)}px - 0.25rem);
  margin-right: 0.25rem;
  width: ${({ depth }) => iconSize(depth)}px;
`;

/**
 * Shows an optional sparkline-style horizontal bar chart and value below the item label.
 */
export const Bar = styled.div<{ width: number }>`
  align-items: center;
  color: #777;
  display: flex;
  font-size: ${fontSize('xs')};
  line-height: 1.125;
  width: 100%;

  &::before {
    background: #bbb;
    content: ' ';
    display: inline-block;
    height: 0.3125rem;
    margin-right: ${({ width }) => (width === 0 ? '0' : '0.25rem')};
    transition: margin-right 0.15s ease, width 0.15s ease;
    width: max(0px, calc(var(--bar-width, 0%) * 0.7));
  }
`;
