import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar__nav">
        <li>
          <NavLink to="/dashboard" className="sidebar__link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className="sidebar__link">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className="sidebar__link">
            Settings
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
