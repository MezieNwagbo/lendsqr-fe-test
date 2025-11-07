import "./userTable.scss";
import { useEffect } from "react";
import DataTable, { type TableColumn } from "react-data-table-component";
import KebabMenu from "../../../../components/kebabMenu/KebabMenu";
import TablePagination from "../../../../components/tablePagination/TablePagination";
import { formatDate } from "../../../../utils/formatter";

import { useNavigate } from "react-router-dom";

import viewIcon from "../../../../assets/images/users/view_icon.svg";
import activateIcon from "../../../../assets/images/users/activate_icon.svg";
import blacklistIcon from "../../../../assets/images/users/blacklist_icon.svg";

import useUserTable from "../../hooks/useUserTable";
import { useUserNavigation } from "../../hooks/useUserNavigation";

import FilterDropdown from "../filterDropdown/FilterDropdown";
import type { UserType } from "../../types/userTypes";

interface UserTableProps {
  users: UserType[];
  loading?: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ users, loading }) => {
  const navigate = useNavigate();
  const { goToUserDetails } = useUserNavigation();
  const {
    paginatedUsers,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSortIconClick,
    currentPage,
    setCurrentPage,
    anchorEl,
    setAnchorEl,
    rowsPerPage,
    rowCount,
  } = useUserTable(users);

  useEffect(() => {
    setCurrentPage(1);
  }, [users]);

  const SortIcon = () => (
    <div style={{ marginLeft: "10px" }} onClick={handleSortIconClick}>
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
      </svg>
    </div>
  );

  // Table column definitions
  const columns: TableColumn<UserType>[] = [
    {
      name: "ORGANIZATION",
      selector: (row) => row.organisation,
      sortable: true,
    },
    { name: "USERNAME", selector: (row) => row.username, sortable: true },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
      grow: 2,
    },
    { name: "PHONE NUMBER", selector: (row) => row.phoneNumber },
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
      cell: (row) => (
        <KebabMenu
          options={[
            {
              label: "View Details",
              icon: viewIcon,
              onClick: (user) => goToUserDetails(user),
            },
            { label: "Blacklist User", icon: blacklistIcon },
            { label: "Activate User", icon: activateIcon },
          ]}
          row={row}
        />
      ),
      width: "70px",
      button: true,
    },
  ];

  const userTableStyle = {
    headRow: {
      style: { borderBottom: "0px solid rgba(0,0,0,0)!important" },
    },
    rows: {
      style: {
        border: "none !important",
        borderTop: "1px solid rgba(33, 63, 125, 0.1) !important",
      },
    },
  };

  return (
    <>
      <div className="user-table">
        <DataTable
          columns={columns}
          // ✅ Use paginatedUsers instead of full users array
          data={paginatedUsers}
          progressPending={loading}
          customStyles={userTableStyle}
          responsive
          className="user-table__wrapper"
          onRowClicked={(row: UserType) => goToUserDetails(row)}
          sortIcon={<SortIcon />}
          pagination={false} // explicitly off
        />
      </div>

      {/* ✅ External pagination below table */}
      <TablePagination
        rowsPerPage={rowsPerPage}
        rowCount={rowCount}
        currentPage={currentPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {/* ✅ Portal-based dropdown */}
      <FilterDropdown
        isOpen={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      />
    </>
  );
};

export default UserTable;
