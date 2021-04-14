import LanguageMenu from './LanguageMenu';
import UserMenu from './UserMenu';

import styles from './Header.module.scss';

interface HeaderProps {
  /**
   * Key of the current locale.
   */
  locale: React.ComponentProps<typeof LanguageMenu>['selected'];
  /**
   * Temporary user object schema.
   * @todo Remove or replace with a model.
   */
  user?: React.ComponentProps<typeof UserMenu>['user'];
}

export default function Header({ locale, user }: HeaderProps): React.ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.button}>
        <button className={styles['header-link']}>Feedback</button>
        <LanguageMenu selected={locale} />
        {user ? (
          <div className={styles['grouped-actions']}>
            <button className={styles['header-link-filled']}>My scenarios</button>
            <UserMenu user={user} />
          </div>
        ) : (
          <>
            <button className={styles['header-link-outlined']}>Sign up</button>
            <button className={styles['header-link-filled']}>Log in</button>
          </>
        )}
      </div>
    </div>
  );
}
