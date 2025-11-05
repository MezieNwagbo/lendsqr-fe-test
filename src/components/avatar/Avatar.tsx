import React from "react";
import "./Avatar.scss";

interface AvatarProps {
  /** Image URL for the avatar */
  src?: string;
  /** Alternative text for the image */
  alt?: string;
  /** Name (used to generate initials if no image is provided) */
  name?: string;
  /** Size of the avatar (e.g. sm, md, lg) */
  size?: "sm" | "md" | "lg";
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * Avatar component that displays a user image or fallback initials.
 */
const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name = "",
  size = "md",
  onClick,
}) => {
  // Generate initials if no image is available
  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  return (
    <div className={`avatar avatar--${size}`} onClick={onClick}>
      {src ? (
        <img src={src} alt={alt || name} className="avatar__image" />
      ) : (
        <span className="avatar__initials">{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;
