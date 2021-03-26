interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps): JSX.Element {
  return <button>{children}</button>;
}
