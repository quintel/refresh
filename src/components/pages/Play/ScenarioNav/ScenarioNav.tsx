import { Menu, MenuButton, MenuItem, MenuItems } from '@/components/menu';
import Divider from '@/components/Divider';
import RegionFlagIcon from '@/components/RegionFlagIcon';

import {
  ActionButton,
  Actions,
  AreaName,
  ScenarioInfo,
  ScenarioTitle,
  WithEllipses,
  Wrapper,
} from './styles';

export interface ScenarioNavProps {
  /**
   * Human-readable, translated name of the region for the scenario.
   */
  areaName: string;
  /**
   * The scenario end year.
   */
  endYear: number;
  /**
   * Whether the user is an admin; should the "Open in ETEngine" option be available?
   * @todo Remove or change this when proper state management and user auth is added.
   */
  isAdmin: boolean;
  /**
   * Temporary structure for the data about the currently active saved scenario, if any.
   */
  savedScenario?: {
    id: number;
    title: string;
  };
}

/**
 * Temporary function used as the onSelect for menu items.
 */
const noop = () => void 0;

/**
 * Creates a horizontal navigation bar which contains information about the current scenario, and
 * options for changing and interacting with the scenario.
 */
export default function ScenarioNav({
  areaName,
  endYear,
  isAdmin,
  savedScenario,
}: ScenarioNavProps): React.ReactElement {
  return (
    <Wrapper>
      <ScenarioInfo>
        <RegionFlagIcon regionCode={areaName} /> <AreaName>{areaName}</AreaName>{' '}
        <span>{endYear}</span>
        {savedScenario && <ScenarioTitle>{savedScenario.title}</ScenarioTitle>}
      </ScenarioInfo>
      <Actions>
        <ActionButton>Save scenario</ActionButton>
        <Menu>
          <ActionButton as={MenuButton}>Actions</ActionButton>
          <MenuItems position="right">
            {savedScenario ? (
              <MenuItem as="button" onSelect={noop}>
                <WithEllipses>Save scenario as</WithEllipses>
              </MenuItem>
            ) : (
              <MenuItem as="button" onSelect={noop}>
                <WithEllipses>Save scenario</WithEllipses>
              </MenuItem>
            )}
            <MenuItem as="button" onSelect={noop}>
              Reset scenario
            </MenuItem>
            {isAdmin && (
              <>
                <Divider />
                <MenuItem as="button" onSelect={noop}>
                  Open in ETEngine
                </MenuItem>
              </>
            )}
          </MenuItems>
        </Menu>
      </Actions>
    </Wrapper>
  );
}
