import styles from './Button.module.scss';

export type ButtonProps = {
  children: React.ReactNode;
};

export default function Button({ children }: ButtonProps): React.ReactElement {
  return <button className={styles.button}>{children}</button>;
}
