// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import { Menu, MenuButton, MenuItem, MenuItems } from '.';

export default {
  title: 'Example/Menu',
  component: Menu,
} as Meta;

const onSelect = action('onSelect');

export const WithButton = (): React.ReactElement => (
  <Menu>
    <MenuButton>Action</MenuButton>
    <MenuItems>
      <MenuItem as="button" onSelect={onSelect}>
        Option one
      </MenuItem>
      <MenuItem as="button" onSelect={onSelect}>
        Option two
      </MenuItem>
      <MenuItem as="button" onSelect={onSelect}>
        Option three
      </MenuItem>
    </MenuItems>
  </Menu>
);

export const RightArrow = (): React.ReactElement => (
  <Menu>
    <MenuButton>A menu which is positioned on the right</MenuButton>
    <MenuItems position="right">
      <MenuItem as="button" onSelect={onSelect}>
        Option one
      </MenuItem>
      <MenuItem as="button" onSelect={onSelect}>
        Option two
      </MenuItem>
      <MenuItem as="button" onSelect={onSelect}>
        Option three
      </MenuItem>
    </MenuItems>
  </Menu>
);
