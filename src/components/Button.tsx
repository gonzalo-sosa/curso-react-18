interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const Button = ({
  type = "button",
  color = "primary",
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
