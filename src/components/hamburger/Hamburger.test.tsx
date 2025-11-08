import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Hamburger from "./Hamburger";

describe("Hamburger Component", () => {
  it("renders all hamburger lines", () => {
    render(<Hamburger isOpen={false} onClick={() => {}} />);
    const lines = screen.getAllByRole("presentation");
    expect(lines.length).toBe(3);
  });

  it("applies the 'hamburger--open' class when isOpen is true", () => {
    const { container } = render(
      <Hamburger isOpen={true} onClick={() => {}} />
    );
    const button = container.querySelector(".hamburger");
    expect(button).toHaveClass("hamburger--open");
  });

  it("does not apply the 'hamburger--open' class when isOpen is false", () => {
    const { container } = render(
      <Hamburger isOpen={false} onClick={() => {}} />
    );
    const button = container.querySelector(".hamburger");
    expect(button).not.toHaveClass("hamburger--open");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Hamburger isOpen={false} onClick={handleClick} />);
    const button = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders with the correct size", () => {
    const size = 24;
    const { container } = render(
      <Hamburger isOpen={false} onClick={() => {}} size={size} />
    );
    const button = container.querySelector("button");
    expect(button).toHaveStyle(`width: ${size}px`);
    expect(button).toHaveStyle(`height: ${size}px`);
  });
});
