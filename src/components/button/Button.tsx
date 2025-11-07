import React from "react";
import "./Button.scss";

export type ButtonVariant =
  | "primary"
  | "primary-outline"
  | "danger"
  | "danger-outline";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  ...rest
}) => {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? <span className="btn__loader"></span> : children}
    </button>
  );
};

export default Button;
