import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Input from "./Input";

describe("Input Component", () => {
  it("renders an input with label and required indicator", () => {
    render(<Input label="Email" name="email" required />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders error text when error prop is provided", () => {
    render(<Input label="Username" name="username" error="Required field" />);
    expect(screen.getByText(/required field/i)).toBeInTheDocument();
    const wrapper = screen.getByLabelText(/username/i).closest(".input");
    expect(wrapper).toHaveClass("input--error");
  });

  it("renders helper text when helperText prop is provided and no error", () => {
    render(
      <Input label="Phone" name="phone" helperText="Enter your phone number" />
    );
    expect(screen.getByText(/enter your phone number/i)).toBeInTheDocument();
  });

  it("renders password field with toggle button", () => {
    render(<Input label="Password" name="password" type="password" />);
    const input = screen.getByLabelText(/password/i);
    expect(input).toHaveAttribute("type", "password");

    const toggleButton = screen.getByRole("button", { name: /show/i });
    fireEvent.click(toggleButton);
    expect(screen.getByRole("button", { name: /hide/i })).toBeInTheDocument();

    // Type should now be 'text'
    expect(input).toHaveAttribute("type", "text");

    // Toggle back
    fireEvent.click(screen.getByRole("button", { name: /hide/i }));
    expect(input).toHaveAttribute("type", "password");
  });

  it("updates value when user types", () => {
    render(<Input label="Email" name="email" />);
    const input = screen.getByLabelText(/email/i);
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(input).toHaveValue("test@example.com");
  });

  it("does not show label if not provided", () => {
    render(<Input name="username" />);
    expect(screen.queryByText(/username/i)).not.toBeInTheDocument();
  });
});
