import React from "react";
import "./Input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label for the input */
  label?: string;
  /** Error message for validation state */
  error?: string;
  /** Helper text (optional) */
  helperText?: string;
  /** Whether the input is required */
  required?: boolean;
}

/**
 * A reusable, accessible input component.
 */
const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  id,
  required,
  ...rest
}) => {
  const inputId = id || rest.name;

  return (
    <div className={`input ${error ? "input--error" : ""}`}>
      {label && (
        <label htmlFor={inputId} className="input__label">
          {label} {required && <span className="input__required">*</span>}
        </label>
      )}

      <input id={inputId} className="input__field" {...rest} />

      {error ? (
        <p className="input__error-text">{error}</p>
      ) : helperText ? (
        <p className="input__helper-text">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;
