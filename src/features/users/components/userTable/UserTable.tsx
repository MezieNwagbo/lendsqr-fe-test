import "./UserTable.scss";

import type { UserType } from "../../types/userTypes";

import { useEffect } from "react";
import { useUserNavigation } from "../../hooks/useUserNavigation";
import useUserTable from "../../hooks/useUserTable";
import useUserTableColumns from "../../hooks/useUserTableColumns";

import DataTable from "react-data-table-component";

import TablePagination from "../../../../components/tablePagination/TablePagination";
import FilterDropdown from "../filterDropdown/FilterDropdown";

import { userTableStyle } from "./tableStyle";

type UserTableProps = {
  users: UserType[];
  loading?: boolean;
};

const UserTable: React.FC<UserTableProps> = ({ users, loading }) => {
  const { goToUserDetails } = useUserNavigation();
  const { columns } = useUserTableColumns();

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

  return (
    <>
      <div className="user-table">
        <DataTable
          columns={columns}
          data={paginatedUsers}
          progressPending={loading}
          customStyles={userTableStyle}
          responsive
          className="user-table__wrapper"
          onRowClicked={(row: UserType) => goToUserDetails(row)}
          sortIcon={<SortIcon />}
          pagination={false}
        />
      </div>

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
