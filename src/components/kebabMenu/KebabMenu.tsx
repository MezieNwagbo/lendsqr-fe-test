import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./KebabMenu.scss";

interface KebabMenuOption {
  label: string;
  icon?: string;
}

interface KebabMenuProps {
  options: KebabMenuOption[];
}

const KebabMenu: React.FC<KebabMenuProps> = ({ options }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );

  const toggleMenu = () => setOpen((s) => !s);

  useEffect(() => {
    if (!open) return;

    const button = buttonRef.current;
    if (!button) return;

    // compute button bounding rect
    const rect = button.getBoundingClientRect();

    // place dropdown to the right of the button (adjust offsets as needed)
    const top = rect.top + 50; // center vertically
    const left = rect.right - 110; // small gap from button to popup

    setCoords({ top, left });

    // listeners to close on outside click, scroll, resize
    const handleClick = (e: MouseEvent) => {
      if (button && button.contains(e.target as Node)) return;

      // if click is inside dropdown, handle closing via option click
      const dropdown = document.getElementById("kebab-dropdown-portal");
      if (dropdown && dropdown.contains(e.target as Node)) return;
      setOpen(false);
    };

    const handleScroll = () => setOpen(false);
    const handleResize = () => setOpen(false);

    document.addEventListener("mousedown", handleClick);
    window.addEventListener("scroll", handleScroll, true); // capture scroll on parents
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  // render dropdown portal
  const dropdown =
    open && coords
      ? ReactDOM.createPortal(
          <ul
            id="kebab-dropdown-portal"
            className="kebab-menu__dropdown-portal"
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              transform: "translateY(-50%)",
              zIndex: 9999,
            }}
          >
            {options.map((opt, i) => (
              <li
                key={i}
                className="kebab-menu__item"
                onClick={() => {
                  setOpen(false);
                }}
              >
                {opt.icon && (
                  <img
                    src={opt.icon}
                    alt={opt.label}
                    className="kebab-menu__icon"
                  />
                )}
                <span>{opt.label}</span>
              </li>
            ))}
          </ul>,
          document.body
        )
      : null;

  return (
    <>
      <div className="kebab-menu">
        <button
          ref={buttonRef}
          className="kebab-menu__button"
          onClick={toggleMenu}
          aria-haspopup="true"
          aria-expanded={open}
        >
          <svg
            width="4"
            height="15"
            viewBox="0 0 4 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.66667 3.33333C2.58889 3.33333 3.33333 2.58889 3.33333 1.66667C3.33333 0.744444 2.58889 0 1.66667 0C0.744444 0 0 0.744444 0 1.66667C0 2.58889 0.744444 3.33333 1.66667 3.33333ZM1.66667 5.55556C0.744444 5.55556 0 6.3 0 7.22222C0 8.14444 0.744444 8.88889 1.66667 8.88889C2.58889 8.88889 3.33333 8.14444 3.33333 7.22222C3.33333 6.3 2.58889 5.55556 1.66667 5.55556ZM1.66667 11.1111C0.744444 11.1111 0 11.8556 0 12.7778C0 13.7 0.744444 14.4444 1.66667 14.4444C2.58889 14.4444 3.33333 13.7 3.33333 12.7778C3.33333 11.8556 2.58889 11.1111 1.66667 11.1111Z"
              fill="#545F7D"
            />
          </svg>
        </button>
      </div>

      {dropdown}
    </>
  );
};

export default KebabMenu;
