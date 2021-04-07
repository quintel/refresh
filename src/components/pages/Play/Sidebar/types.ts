/**
 * Contains types which are part of the Sidebar public API.
 */

/**
 * Attributes common to both sidebar sections and items.
 */
interface SidebarElement {
  // A unique key which identifies the item. Used to look up the localized string.
  key: string;
}

/**
 * Represets a top-level sidebar item. These have no icons, and never show a bar chart below the
 * item text.
 */
export interface Section extends SidebarElement {
  items: Item[];
}

/**
 * Represents a sidebar item nested inside a Section or other Item. These may have an
 * icon and bar.
 *
 * By default, items may contain a nested item but those nested items may not have items of their
 * own.
 */
export interface Item<NestedItems = Item<never>[]> extends SidebarElement {
  // Optional settings for showing a mini single-series horizontal bar chart below the sidebar item
  // name.
  bar?: {
    // Accessible label for the bar value.
    title: string;

    // Formatted value, shown next to the bar.
    value: string;

    // Width of the bar, in percent.
    width: number;
  };

  // Icon shown next to the sidebar item text.
  icon?: string;

  // Sub-items are optional.
  items?: NestedItems;
}
