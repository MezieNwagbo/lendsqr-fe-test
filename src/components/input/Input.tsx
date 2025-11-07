import { useState } from "react";
import "./Input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  id,
  required,
  type,
  ...rest
}) => {
  const inputId = id || rest.name;

  const [passwordType, setPasswordType] = useState(type);

  const handleToggle = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordType(passwordType === type ? "text" : type);
  };

  return (
    <div className={`input ${error ? "input--error" : ""}`}>
      {label && (
        <label htmlFor={inputId} className="input__label">
          {label} {required && <span className="input__required">*</span>}
        </label>
      )}

      <div className="input__wrapper">
        <input
          id={inputId}
          className="input__field"
          type={type === "password" ? passwordType : type}
          {...rest}
        ></input>
        {type === "password" && (
          <button onClick={handleToggle}>
            {passwordType === "password" ? "SHOW" : "HIDE"}
          </button>
        )}
      </div>

      {error ? (
        <p className="input__error-text">{error}</p>
      ) : helperText ? (
        <p className="input__helper-text">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;
