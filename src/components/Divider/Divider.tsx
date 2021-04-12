import styles from './Divider.module.scss';

export default function Divider(): React.ReactElement {
  return <hr aria-orientation="horizontal" className={styles.divider} />;
}
