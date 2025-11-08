import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Avatar from "./Avatar";

describe("Avatar Component", () => {
  it("renders an image when src is provided", () => {
    render(<Avatar src="/test-image.jpg" alt="User avatar" name="John Doe" />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
    expect(image).toHaveAttribute("alt", "User avatar");
  });

  it("renders initials when no src is provided", () => {
    render(<Avatar name="John Doe" />);
    const initials = screen.getByText("JD");
    expect(initials).toBeInTheDocument();
    expect(initials).toHaveClass("avatar__initials");
  });

  it("renders only one initial when a single name is provided", () => {
    render(<Avatar name="Chimezie" />);
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  it("renders with the correct size class", () => {
    const { container } = render(<Avatar name="Jane Doe" size="lg" />);
    const avatar = container.querySelector(".avatar");
    expect(avatar).toHaveClass("avatar--lg");
  });

  it("uses name as alt text if alt is not provided", () => {
    render(<Avatar src="/image.png" name="John Doe" />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "John Doe");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Avatar name="Jane Doe" onClick={handleClick} />);
    const avatar = screen.getByText("JD");
    fireEvent.click(avatar);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
