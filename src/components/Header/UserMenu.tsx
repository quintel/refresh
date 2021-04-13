import { Menu, MenuButton, MenuItem, MenuItems } from '@/components/menu';
import Divider from '@/components/Divider';

import { HeaderLink } from './styles';

interface UserMenuProps {
  /**
   * Temporary user object schema.
   * @todo Remove or replace with a model.
   */
  user: {
    isAdmin: boolean;
    name: string;
  };
}

const noop = () => void 0;

/**
 * A drop-down menu shown in the main header. Provides users with easy access to their profile and
 * session management.
 */
export default function UserMenu({ user: { isAdmin, name } }: UserMenuProps): React.ReactElement {
  return (
    <Menu>
      <HeaderLink as={MenuButton} variant="fill">
        {name}
      </HeaderLink>
      <MenuItems position="right">
        <MenuItem onSelect={noop}>My account</MenuItem>
        <MenuItem onSelect={noop}>Sign out</MenuItem>
        {isAdmin && (
          <>
            <Divider />
            <MenuItem onSelect={noop}>Admin</MenuItem>
          </>
        )}
      </MenuItems>
    </Menu>
  );
}
