import "./userTable.scss";
import React from "react";
import DataTable, { type TableColumn } from "react-data-table-component";
import KebabMenu from "../../../../components/kebabMenu/KebabMenu";
import { formatDate } from "../../../../utils/formatter";

import viewIcon from "../../../../assets/images/users/view_icon.svg";
import activateIcon from "../../../../assets/images/users/activate_icon.svg";
import blacklistIcon from "../../../../assets/images/users/blacklist_icon.svg";

import type { UserType } from "../../types/userTypes";

interface UserTableProps {
  users: UserType[];
  loading?: boolean;
}

const SortIcon = () => (
  <div style={{ marginLeft: "10px" }}>
    <svg
      width="16"
      height="11"
      viewBox="0 0 16 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.22222 10.6667H9.77778V8.88889H6.22222V10.6667ZM0 0V1.77778H16V0H0ZM2.66667 6.22222H13.3333V4.44444H2.66667V6.22222Z"
        fill="#545F7D"
      />
    </svg>{" "}
  </div>
);

const UserTable: React.FC<UserTableProps> = ({ users, loading }) => {
  const columns: TableColumn<UserType>[] = [
    {
      name: "ORGANIZATION",
      selector: (row) => row.organisation,
      sortable: true,
    },
    {
      name: "USERNAME",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
      grow: 2,
    },
    {
      name: "PHONE NUMBER",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "DATE JOINED",
      selector: (row) => formatDate(row.dateJoined),
      sortable: true,
    },
    {
      name: "STATUS",
      cell: (row) => (
        <span className={`status-badge status-${row.status.toLowerCase()}`}>
          {row.status}
        </span>
      ),
    },
    {
      name: "",
      cell: () => (
        <KebabMenu
          options={[
            { label: "View Details", icon: viewIcon },
            {
              label: "Blacklist User",
              icon: blacklistIcon,
            },
            {
              label: "Activate User",
              icon: activateIcon,
            },
          ]}
        />
      ),
      width: "70px",
      button: true,
    },
  ];

  //extra style for table
  const userTableStyle = {
    headRow: {
      style: {
        borderBottom: "0px solid rgba(0,0,0,0)!important",
      },
    },

    rows: {
      style: {
        border: "none !important",
        borderBottom: "1px solid rgba(33, 63, 125, 0.1) !important",
      },
    },
  };

  return (
    <div className="user-table">
      <DataTable
        columns={columns}
        data={users}
        progressPending={loading}
        pagination
        customStyles={userTableStyle}
        paginationPerPage={10}
        responsive
        className="user-table__wrapper"
        sortIcon={<SortIcon />}
      />
    </div>
  );
};

export default UserTable;
