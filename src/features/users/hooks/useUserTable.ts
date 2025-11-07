import { useState } from "react";

import type { UserType } from "../types/userTypes";

const useUserTable = (users: UserType[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const rowCount = users.length;
  const totalPages = Math.ceil(rowCount / rowsPerPage);

  const paginatedUsers = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleChangePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleChangeRowsPerPage = (newPerPage: number) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handleSortIconClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  return {
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
  };
};

export default useUserTable;
