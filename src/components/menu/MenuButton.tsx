import { MenuButton as ReachMenuButton } from '@reach/menu-button';
import clsx from 'clsx';

import Arrow from './Arrow';
import styles from './Menu.module.scss';

export default function MenuButton({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof ReachMenuButton>): React.ReactElement {
  return (
    <ReachMenuButton {...rest} className={clsx([styles.button, className])}>
      {children} <Arrow />
    </ReachMenuButton>
  );
}
