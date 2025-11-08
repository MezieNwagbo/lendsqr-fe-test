import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import KebabMenu from "./KebabMenu";

describe("KebabMenu Component", () => {
  const mockOptions = [
    { label: "Edit", onClick: vi.fn() },
    { label: "Delete", onClick: vi.fn() },
  ];

  it("renders the kebab button", () => {
    render(<KebabMenu options={mockOptions} />);
    const button = screen.getByRole("button"); // simpler & robust
    expect(button).toBeInTheDocument();
  });

  it("opens the menu when clicked", async () => {
    render(<KebabMenu options={mockOptions} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Edit")).toBeInTheDocument();
      expect(screen.getByText("Delete")).toBeInTheDocument();
    });
  });

  it("calls the correct onClick handler when an option is clicked", async () => {
    render(<KebabMenu options={mockOptions} row={{ id: 1 }} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    const editOption = await screen.findByText("Edit");
    fireEvent.click(editOption);

    expect(mockOptions[0].onClick).toHaveBeenCalledWith({ id: 1 });
  });

  it("closes the menu after clicking an option", async () => {
    render(<KebabMenu options={mockOptions} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    const deleteOption = await screen.findByText("Delete");
    fireEvent.click(deleteOption);

    await waitFor(() => {
      expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    });
  });

  it("does not crash if no onClick is provided", async () => {
    const safeOptions = [{ label: "No Action" }];
    render(<KebabMenu options={safeOptions} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    const item = await screen.findByText("No Action");
    fireEvent.click(item);

    await waitFor(() => {
      expect(screen.queryByText("No Action")).not.toBeInTheDocument();
    });
  });
});
