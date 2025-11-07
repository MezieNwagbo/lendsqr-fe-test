import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "./Button";

describe("Button Component", () => {
  it("renders the button with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn", "btn--primary", "btn--md");
    expect(button).not.toBeDisabled();
  });

  it("applies variant and size classes correctly", () => {
    render(
      <Button variant="danger-outline" size="lg">
        Delete
      </Button>
    );
    const button = screen.getByRole("button", { name: /delete/i });

    expect(button).toHaveClass("btn--danger-outline", "btn--lg");
  });

  it("disables the button when disabled or isLoading is true", () => {
    const { rerender } = render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();

    rerender(<Button isLoading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
