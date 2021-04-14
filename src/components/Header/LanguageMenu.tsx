import { Menu, MenuButton, MenuItem, MenuItems } from '@/components/menu';

import styles from './Header.module.scss';

type LocaleKey = 'en' | 'nl';

const options: LocaleKey[] = ['en', 'nl'];
const names = { en: 'English', nl: 'Nederlands' };

const noop = () => void 0;

export default function LanguageMenu({ selected }: { selected: LocaleKey }): React.ReactElement {
  return (
    <Menu>
      <MenuButton className={styles['header-link']}>{names[selected]}</MenuButton>
      <MenuItems>
        {options.map((key) => (
          <MenuItem key={key} onSelect={noop}>
            {names[key]}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
