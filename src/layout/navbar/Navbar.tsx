import "./Navbar.scss";

import { useState, useEffect } from "react";
import { getUserFromStorage } from "../../utils/storage";
import logoFull from "../../assets/images/shared/logo_with_text.svg";
import logoIcon from "../../assets/images/shared/logo_icon.svg";
import profileImage from "../../assets/images/navbar/profile_image.png";
import bellIcon from "../../assets/images/navbar/bell.svg";

import SearchInput from "../../components/searchInput/SearchInput";
import Avatar from "../../components/avatar/Avatar";
import { Link } from "react-router-dom";
import Hamburger from "../../components/hamburger/Hamburger";

const Navbar = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar?: string;
  } | null>(null);

  useEffect(() => {
    const storedUser = getUserFromStorage();
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <div className=" navbar">
      <nav>
        <header className="navbar__logo">
          <img src={logoFull} alt="Company Logo" />
        </header>

        <header className="navbar__logo-icon">
          <img src={logoIcon} alt="Company Logo" />
          <Hamburger />
        </header>

        <div className="navbar__search">
          <SearchInput />
        </div>

        <div className="navbar__actions-container">
          <div>
            <Link to="">Docs</Link>
          </div>
          <button className="bell-icon">
            <img src={bellIcon} alt="bell-icon" />
          </button>

          <div className="navbar__image-name">
            <div className="navbar__avatar">
              <Avatar src={profileImage} name={user?.name} />
            </div>
            <div className="navbar__username">
              <p>{user?.name.split(" ")[0]}</p>
              <div>
                <svg
                  // width="8"
                  // height="5"
                  viewBox="0 0 8 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.05928 3.8696C3.39522 4.24304 3.9421 4.23992 4.2749 3.8696L7.1499 0.675C7.48584 0.30234 7.35224 0 6.85146 0H0.48266C-0.0181206 0 -0.14938 0.30546 0.18422 0.675L3.05928 3.8696Z"
                    fill="#213F7D"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="navbar__search-mobile">
        <SearchInput />
      </div>
    </div>
  );
};

export default Navbar;
