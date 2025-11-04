import React from "react";
import "./Button.scss";

export type ButtonVariant = "primary";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Whether the button is loading or disabled */
  isLoading?: boolean;
}

/**
 * A reusable button component with consistent styling and variants.
 */
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
