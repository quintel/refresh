import { useState } from 'react';

import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@reach/accordion';

import '@reach/accordion/styles.css';

import cn from 'clsx';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@/components/disclosure';
import { Item as ItemType, Section as SectionType } from './types';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  // Controlled-mode way of setting the currently active item. In controlled mode the Sidebar will
  // not set the activePath when the user clicks on an item, but relied on you re-rendering the
  // component with a new `activePath`
  activePath?: string[];

  // Non-controlled mode way of setting which item is initially active.
  defaultActivePath?: string[];
  items: SectionType[];

  // onChange event fired whenever the user activates a new item.
  onChange?: (path: string[]) => void;
}

interface SectionProps extends Omit<SectionType, 'key'> {
  // The array containing the keys towards the currently active items in the SidebarNav.
  activePath: string[];

  // Callback function triggered when a sidebar item becomes active. Not used by the section itself,
  // but is passed to the items belonging to the section.
  onActivate: (path: string[]) => void;

  // Path to the section. Contains the key of the section.
  path: [string];
}

/**
 * Represents a sidebar item nested inside a Section or other Item. These may have an icon and bar.
 */
interface ItemProps extends Omit<ItemType, 'key'> {
  // The array containing the keys towards the currently active items in the SidebarNav.
  activePath: string[];

  // Callback function triggered when an item becomes active.
  onActivate: (path: string[]) => void;

  // An array containing the keys of all parent items and the key of the current item, with the
  // top-most item first.
  path: string[];
}

/**
 * Generates props which can be provided to a component, so that when it is clicked the associated
 * path will become active.
 */
function activatableProps({
  key,
  isActive,
  onActivate,
}: {
  key: string;
  isActive: boolean;
  onActivate: () => void;
}) {
  return {
    className: isActive ? styles.active : undefined,
    href: `#${key}`,
    onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      onActivate();
    },
  };
}

/**
 * Given the items used by a sidebar, returns the default active path.
 */
function defaultPath(items: SectionType[]) {
  const item = items.find((candidate) => candidate.items.length > 0);

  if (item) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return [item.key, item.items![0].key];
  }

  return [];
}

/**
 * Given a path to a sidebar item, returns its key.
 */
function keyFromPath(path: string[]) {
  return path[path.length - 1];
}

/**
 * Determines if the item at the currentPath is considered "active" according to the activePath.
 * If the currentPath matches, or is a subset of the activePath, then this returns true.
 */
function pathIsActive(currentPath: string[], activePath: string[]) {
  if (activePath.length < currentPath.length) {
    return false;
  }

  // It's faster to check in reverse (from right to left), since it is more likely that the
  // right-most items won't match than the left (i.e. different items belonging to the same section
  // will both match the section ID, but not the item ID).
  for (let index = currentPath.length - 1; index >= 0; index--) {
    if (currentPath[index] !== activePath[index]) {
      return false;
    }
  }

  return true;
}

/**
 * Component used for top-level items in the sidebar.
 */
function Section({ activePath, items, onActivate, path }: SidebarSectionProps) {
  return (
    <AccordionItem>
      <AccordionButton>{keyFromPath(path)}</AccordionButton>
      <AccordionPanel className={styles.item}>
        {items.map((item) => (
          <Item
            {...item}
            activePath={activePath}
            onActivate={onActivate}
            path={[...path, item.key]}
            key={item.key}
          />
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
}

/**
 * A Item is a link to a section in the application.
 */
function Item(props: ItemProps) {
  const isActive = pathIsActive(props.path, props.activePath);

  if (props.items && props.items.length > 0) {
    return <ItemWithChildren {...props} />;
  }

  const key = keyFromPath(props.path);

  return (
    <div>
      <a
        {...activatableProps({
          isActive,
          key: key,
          onActivate: () => props.onActivate(props.path),
        })}
      >
        {key}
        {props.bar ? <ItemBar {...props.bar} /> : undefined}
      </a>
    </div>
  );
}

/**
 * A Item which has one or more sub-items. These are handled by Reach UI's Disclosure in
 * controlled mode, so that they are only revealed when the item is marked as `active`.
 */
function ItemWithChildren({ activePath, bar, items, onActivate, path }: ItemProps) {
  // An item with children is only active when the path and active path match exactly.
  const isActive = pathIsActive(path, activePath) && path.length === activePath.length;

  return (
    <Disclosure open={pathIsActive(path, activePath)}>
      <DisclosureButton
        as="a"
        {...activatableProps({
          key: keyFromPath(path),
          isActive,
          onActivate: () => onActivate(path),
        })}
      >
        {keyFromPath(path)}
        {bar ? <ItemBar {...bar} /> : undefined}
      </DisclosureButton>
      <DisclosurePanel className={styles.item}>
        {items?.map((item) => (
          <Item
            {...item}
            activePath={activePath}
            onActivate={onActivate}
            path={[...path, item.key]}
            key={item.key}
          />
        ))}
      </DisclosurePanel>
    </Disclosure>
  );
}

/**
 * Draws a mini bar chart below the item label.
 */
function ItemBar({ title, value, width }: NonNullable<ItemType['bar']>) {
  return (
    <div
      aria-label={title}
      className={cn([styles.bar, width === 0 && styles['zero-bar']])}
      style={{ '--bar-width': `${Math.max(Math.min(width, 100), 0)}%` }}
      title={title}
    >
      {value}
    </div>
  );
}

/**
 * Main sidebar component.
 *
 * Sidebars consist of one or more top-level items (Section) which behave as an accordion;
 * clicking on an item expands it, revealing its contents, and hiding the contents belonging to any
 * other section. Any section with zero items will not be rendered.
 *
 * Each section has an array of `items` which are clickable links to different sections in the
 * application. These items may have further sub-`items` which are revealed when their parent is
 * `active`.
 */
export default function Sidebar({
  activePath,
  defaultActivePath,
  items,
  onChange,
}: SidebarProps): React.ReactElement {
  const [currentPath, setActivePath] = useState<string[]>(
    activePath || defaultActivePath || defaultPath(items)
  );

  const activeIndex = items.findIndex(({ key }) => key === currentPath[0]);

  const onActivatePath = (path: string[]) => {
    onChange?.(path);

    if (!activePath) {
      // Non-controlled mode.
      setActivePath(path);
    }
  };

  return (
    <nav className={styles.sidebar}>
      <Accordion defaultIndex={activeIndex}>
        {items.map(
          ({ items, key, ...rest }) =>
            items &&
            items.length > 0 && (
              <Section
                key={key}
                activePath={currentPath}
                path={[key]}
                items={items}
                onActivate={onActivatePath}
                {...rest}
              />
            )
        )}
      </Accordion>
    </nav>
  );
}
