import styled from '@emotion/styled';
import { color, space } from '@/styles/theme';

/**
 * Main wrapper element for the scenario nav.
 */
export const Wrapper = styled.div`
  background: ${color.gray(1)};
  border-bottom: 1px solid ${color.gray(3)};
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

/**
 * Contains the information on the left of the nav: the dataset, end year, and saved scenario title.
 */
export const ScenarioInfo = styled.div`
  align-items: center;
  display: flex;
  padding: ${space(10)} ${space(16)};

  & > * {
    margin-right: ${space(4)};
  }
`;

export const AreaName = styled.span`
  font-weight: 600;
`;

export const ScenarioTitle = styled.span`
  color: ${color.secondary};
  &::before {
    content: ' – ';
  }
`;

/**
 * Contains the action buttons on teh right of the nav.
 */
export const Actions = styled.div`
  display: flex;
`;

export const ActionButton = styled.button`
  background-color: transparent;
  border-left: 1px solid ${color.gray(3)};
  padding: ${space(10)} ${space(16)};
  position: relative;
  transition: background-color var(--transition-duration) var(--transition-timing-function);
  &:focus {
    z-index: 1;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  &:active,
  &[aria-expanded] {
    background-color: var(--color-gray-2);
  }
`;

export const WithEllipses = styled.span`
  &::after {
    content: '…';
  }
`;
