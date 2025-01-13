import { useState } from "react";

type Props = {
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
  onClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Alert = ({ color = "primary", children, onClose }: Props) => {
  return (
    <div
      className={`alert alert-${color} alert-dismissible fade show`}
      role="alert"
    >
      {children}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Alert;
