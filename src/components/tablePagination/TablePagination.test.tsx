import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import TablePagination from "./TablePagination";

describe("TablePagination Component", () => {
  let onChangePage: ReturnType<typeof vi.fn>;
  let onChangeRowsPerPage: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChangePage = vi.fn();
    onChangeRowsPerPage = vi.fn();
  });

  // -------------------------
  // Positive scenario: basic rendering
  // -------------------------
  it("renders pagination info and page numbers correctly", () => {
    render(
      <TablePagination
        rowCount={50}
        rowsPerPage={10}
        currentPage={1}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    );

    // Check info text
    expect(screen.getByText(/Showing/i)).toBeInTheDocument();
    expect(screen.getByText(/out of 50/i)).toBeInTheDocument();

    // Check rowsPerPage select
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect((select as HTMLSelectElement).value).toBe("10");

    // Check page numbers
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();

    // Check arrows
    expect(screen.getAllByRole("button")).toHaveLength(7); // 2 arrows + 5 page numbers
  });

  // -------------------------
  // Positive scenario: clicking controls
  // -------------------------
  it("calls onChangePage when page number or arrow clicked", () => {
    render(
      <TablePagination
        rowCount={50}
        rowsPerPage={10}
        currentPage={2}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    );

    // Click previous arrow
    const prevArrow = screen.getAllByRole("button")[0];
    fireEvent.click(prevArrow);
    expect(onChangePage).toHaveBeenCalledWith(1, 50);

    // Click next arrow
    const nextArrow = screen.getAllByRole("button")[6]; // last button
    fireEvent.click(nextArrow);
    expect(onChangePage).toHaveBeenCalledWith(3, 50);

    // Click page number button
    const pageBtn = screen.getByText("3");
    fireEvent.click(pageBtn);
    expect(onChangePage).toHaveBeenCalledWith(3, 50);
  });

  it("calls onChangeRowsPerPage when select value changes", () => {
    render(
      <TablePagination
        rowCount={50}
        rowsPerPage={10}
        currentPage={1}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "25" } });
    expect(onChangeRowsPerPage).toHaveBeenCalledWith(25, 1);
  });

  // Negative scenario: currentPage beyond totalPages

  it("handles currentPage greater than totalPages gracefully", () => {
    render(
      <TablePagination
        rowCount={15}
        rowsPerPage={10}
        currentPage={5}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    );

    // Total pages = 2, but currentPage = 5, component should still render page numbers
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
