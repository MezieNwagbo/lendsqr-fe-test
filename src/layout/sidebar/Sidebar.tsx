import "./Sidebar.scss";

import useLogout from "../../features/auth/hooks/useLogout/useLogout";

import { NavLink } from "react-router-dom";
import { sidebarData } from "../../data/sidebarData";
import { useSidebar } from "../../context/SidebarContext";

import DashboardIcon from "../../assets/images/sidebarMenu/dashboard_icon.svg";
import organizationIcon from "../../assets/images/sidebarMenu/organization_icon.svg";
import logoutIcon from "../../assets/images/sidebarMenu/logout_icon.svg";

const Sidebar = () => {
  const { closeSidebar } = useSidebar();
  const { handleLogout } = useLogout();
  return (
    <aside className="sidebar">
      {/* Switch org  */}
      <div className="sidebar__switch">
        <div onClick={closeSidebar} className="sidebar__switch-link">
          <img src={organizationIcon} alt="Dashboard" />
          <span>
            Switch organization{" "}
            <svg
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.67188 0.272225C10.513 -0.568866 11.7741 0.734883 10.933 1.53332L6.18221 6.28408C5.84589 6.66251 5.25744 6.66251 4.92112 6.28408L0.254641 1.65974C-0.544339 0.818645 0.717299 -0.442502 1.55785 0.398645L5.55163 4.39242L9.67188 0.272225Z"
                fill="#213F7D"
              />
            </svg>
          </span>
        </div>
      </div>

      <ul className="sidebar__nav">
        {/* Dashboard  */}
        <li className="sidebar__dashboard">
          <NavLink
            to="/dashboard"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? "active" : ""}`
            }
          >
            <img src={DashboardIcon} alt="Dashboard" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        {/* Dynamically render sections */}
        {sidebarData.map((section) => (
          <li key={section.title} className="sidebar__section">
            <p className="sidebar__section-title">{section.title}</p>

            <ul className="sidebar__section-items">
              {section.children?.map((child) => (
                <li key={child.title}>
                  <NavLink
                    to={child.route ?? "#"}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `sidebar__link ${isActive ? "active" : ""}`
                    }
                  >
                    {child.icon && <img src={child.icon} alt={child.title} />}
                    <span>{child.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <hr />
      <div className="sidebar__logout">
        <button onClick={handleLogout}>
          <span>
            <img src={logoutIcon} alt="logout_icon" />
          </span>
          Log out
        </button>
        <p className="version">v1.2.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
