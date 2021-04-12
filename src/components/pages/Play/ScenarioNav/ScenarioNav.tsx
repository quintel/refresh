import { Menu, MenuButton, MenuItem, MenuItems } from '@/components/menu';

import Divider from '@/components/Divider';

import styles from './ScenarioNav.module.scss';

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
    <div className={styles.wrapper}>
      <div className={styles['scenario-info']}>
        <span className={styles['area-name']}>{areaName}</span> {endYear}
        {savedScenario && <span className={styles['scenario-title']}>{savedScenario.title}</span>}
      </div>
      <div className={styles.action}>
        <button className={styles['action-button']}>Save scenario</button>
        <Menu>
          <MenuButton className={styles['action-button']}>Actions</MenuButton>
          <MenuItems position="right">
            {savedScenario ? (
              <MenuItem as="button" onSelect={noop}>
                <span className={styles['with-ellipses']}>Save scenario as</span>
              </MenuItem>
            ) : (
              <MenuItem as="button" onSelect={noop}>
                <span className={styles['with-ellipses']}>Save scenario</span>
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
      </div>
    </div>
  );
}
