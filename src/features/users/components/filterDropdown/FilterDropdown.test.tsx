import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterDropdown from "./FilterDropdown";

describe("FilterDropdown Component", () => {
  const mockOnClose = vi.fn();

  // Create a dummy anchor element
  const anchor = document.createElement("div");
  document.body.appendChild(anchor);
  anchor.getBoundingClientRect = vi.fn(() => ({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 100,
    height: 20,
    x: 0,
    y: 0,
    toJSON: () => {},
  }));

  it("renders all filter fields when open", () => {
    render(
      <FilterDropdown isOpen={true} anchorEl={anchor} onClose={mockOnClose} />
    );

    // Check selects
    expect(screen.getByLabelText(/organization/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();

    // Check inputs
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();

    // Check action buttons
    expect(screen.getByText(/reset/i)).toBeInTheDocument();
    expect(screen.getByText(/filter/i)).toBeInTheDocument();
  });

  it("calls onClose when clicking outside", () => {
    render(
      <FilterDropdown isOpen={true} anchorEl={anchor} onClose={mockOnClose} />
    );

    // Simulate click outside
    fireEvent.mouseDown(document.body);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
