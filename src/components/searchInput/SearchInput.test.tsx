import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SearchInput from "./SearchInput";

describe("SearchInput Component", () => {
  it("renders with default placeholder", () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText(/search for anything/i);
    expect(input).toBeInTheDocument();
  });

  it("updates input value on typing", () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText(
      /search for anything/i
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Lendsqr" } });
    expect(input.value).toBe("Lendsqr");
  });

  it("calls onSearch when button is clicked", () => {
    const onSearchMock = vi.fn();
    render(<SearchInput onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(/search for anything/i);
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "React" } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith("React");
  });

  it("calls onSearch when Enter key is pressed", () => {
    const onSearchMock = vi.fn();
    render(<SearchInput onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(/search for anything/i);

    fireEvent.change(input, { target: { value: "Vitest" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(onSearchMock).toHaveBeenCalledWith("Vitest");
  });

  it("trims whitespace before searching", () => {
    const onSearchMock = vi.fn();
    render(<SearchInput onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(/search for anything/i);
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "   React Testing   " } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith("React Testing");
  });
});
