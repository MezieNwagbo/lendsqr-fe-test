import "./tablePagination.scss";
import React from "react";
import type { PaginationComponentProps } from "react-data-table-component";
import chevronRight from "../../assets/images/shared/chevron_right.svg";
import chevronLeft from "../../assets/images/shared/chevron_left.svg";

const TablePagination: React.FC<PaginationComponentProps> = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage,
  currentPage,
}) => {
  const totalPages = Math.ceil(rowCount / rowsPerPage);

  // Generate visible page numbers
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      // If few pages, show all
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // More pages: add ellipses logic
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="pagination">
      <div className="pagination__info">
        Showing{" "}
        <div className="pagination__pages">
          <select
            className="pagination__select"
            value={rowsPerPage}
            onChange={(e) =>
              onChangeRowsPerPage(Number(e.target.value), currentPage)
            }
          >
            {[10, 25, 50, 100].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>{" "}
        out of {rowCount}
      </div>

      <div className="pagination__controls">
        <button
          className="pagination__arrow"
          onClick={() => onChangePage(currentPage - 1, rowCount)}
          disabled={currentPage === 1}
        >
          <img src={chevronLeft} alt="chevron-left" />
        </button>

        <div className="pagination__pages pagination__numbers">
          {pageNumbers.map((page, idx) =>
            typeof page === "number" ? (
              <button
                key={idx}
                className={`pagination__number ${
                  currentPage === page ? "active" : ""
                }`}
                onClick={() => onChangePage(page, rowCount)}
              >
                {page}
              </button>
            ) : (
              <span key={idx} className="pagination__ellipsis">
                {page}
              </span>
            )
          )}
        </div>

        <button
          className="pagination__arrow"
          onClick={() => onChangePage(currentPage + 1, rowCount)}
          disabled={currentPage === totalPages}
        >
          <img src={chevronRight} alt="chevron-right" />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
