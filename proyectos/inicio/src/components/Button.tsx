import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  children?: ReactNode;
}
export const Button = ({
  type = 'button',
  color = 'primary',
  children,
  onClick,
  ...rest
}: Props) => {
  return (
    <button
      type={type}
      className={`btn btn-${color}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
