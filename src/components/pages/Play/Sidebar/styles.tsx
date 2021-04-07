import styled from '@emotion/styled';

export const SidebarWrapper = styled.nav`
  background: #eee;
  box-shadow: inset -1px 0 0 rgba(0 0 0 / 10%);
  width: 220px;
`;

export const SectionLabel = styled.button`
  background: #ddd;
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
    ? `calc(${iconSize(1)}px + 0.25rem)`
    : `calc(${iconSize(1)}px + 0.25rem + ((${iconSize(2)}px + 0.25rem) * ${depth - 1}))`;
}

/**
 * Wraps around the content for a sidebar item - the icon, label, and bar chart, but not the
 * elements for any child items.
 */
export const ItemContent = styled.a<{ active: boolean; depth: number }>`
  background: ${({ active }) => (active ? 'rgb(255 255 255 / 50%)' : 'transparent')};
  display: block;
  padding: 0.25rem 0 0.25rem ${itemLeftPadding};
`;

/**
 * Contains the item icon and label, but not the bar or child items.
 */
export const IconAndLabel = styled.div`
  display: flex;
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
  height: ${({ depth }) => iconSize(depth)}px;
  justify-content: space-around;
  margin-left: calc(-${({ depth }) => iconSize(depth)}px - 0.25rem);
  margin-right: 0.25rem;
  width: ${({ depth }) => iconSize(depth)}px;
`;

/**
 * Shows an optional sparkline-style horizontal bar chart and value below the item label.
 */
export const Bar = styled.div<{ width: number }>`
  display: block;
  font-size: 0.75rem;
  width: 100%;

  &::before {
    background: #ccc;
    content: ' ';
    display: inline-block;
    height: 0.25rem;
    margin-right: ${({ width }) => (width === 0 ? '0' : '0.25rem')};
    transition: margin-right 0.2s ease, width 0.2s ease;
    width: max(0px, calc(var(--bar-width, 0%) * 0.7));
  }
`;
