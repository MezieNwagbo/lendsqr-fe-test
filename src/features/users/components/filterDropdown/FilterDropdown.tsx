import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./FilterDropdown.scss";

import { organizationData } from "../../../../data/mockData/organizationData";
import { userStatusData } from "../../../../data/mockData/userStatusData";

type FilterDropdownProps = {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  isOpen,
  anchorEl,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        anchorEl &&
        !anchorEl.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, anchorEl, onClose]);

  if (!isOpen || !anchorEl) return null;

  const rect = anchorEl.getBoundingClientRect();

  return ReactDOM.createPortal(
    <div
      className="filter-dropdown"
      ref={dropdownRef}
      style={{
        top: rect.bottom + 8 + window.scrollY,
        left: rect.left - 150,
      }}
    >
      <form className="filter-dropdown__content">
        <div className="filter-group">
          <label htmlFor="status">Organization</label>
          <select id="organization">
            <option value="">Select</option>
            {organizationData.map((org) => (
              <option value={org} key={org}>
                {org}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="User" />
        </div>
        <div className="filter-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" />
        </div>
        <div className="filter-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" />
        </div>
        <div className="filter-group">
          <label htmlFor="status">Status</label>
          <select id="status">
            <option value="">Select</option>
            {userStatusData.map((status) => (
              <option value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="filter-dropdown__actions">
          <button className="btn-reset">Reset</button>
          <button className="btn-filter">Filter</button>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default FilterDropdown;
