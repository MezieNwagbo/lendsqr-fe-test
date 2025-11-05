import React from "react";
import "./Hamburger.scss";

interface HamburgerProps {
  /** Is the menu open? */
  isOpen: boolean;
  /** Callback when clicked */
  onClick: () => void;
  /** Optional size */
  size?: number;
}

/**
 * Hamburger menu button.
 */
const Hamburger: React.FC<HamburgerProps> = ({
  isOpen,
  onClick,
  size = 18,
}) => {
  return (
    <button
      className={`hamburger ${isOpen ? "hamburger--open" : ""}`}
      onClick={onClick}
      aria-label="Toggle menu"
      style={{ width: size, height: size }}
    >
      <span className="hamburger__line"></span>
      <span className="hamburger__line"></span>
      <span className="hamburger__line"></span>
    </button>
  );
};

export default Hamburger;
