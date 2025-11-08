import { render, screen, fireEvent } from "@testing-library/react";
import QuickActions from "./QuickActions";
import * as ReactRouterDom from "react-router-dom";
import { vi } from "vitest";

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual: typeof ReactRouterDom = await vi.importActual(
    "react-router-dom"
  );
  return {
    ...actual, // keep all real exports
    useNavigate: () => mockNavigate, // override only useNavigate
  };
});

describe("QuickActions Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders back button and header", () => {
    render(
      <ReactRouterDom.BrowserRouter>
        <QuickActions />
      </ReactRouterDom.BrowserRouter>
    );

    // Back button
    const backButton = screen.getByRole("button", {
      name: /go back to users list/i,
    });
    expect(backButton).toBeInTheDocument();

    // Header
    const header = screen.getByRole("heading", { name: /user details/i });
    expect(header).toBeInTheDocument();

    // Action buttons
    expect(
      screen.getByRole("button", { name: /blacklist user/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /activate user/i })
    ).toBeInTheDocument();
  });

  it("calls navigate when back button is clicked", () => {
    render(
      <ReactRouterDom.BrowserRouter>
        <QuickActions />
      </ReactRouterDom.BrowserRouter>
    );

    const backButton = screen.getByRole("button", {
      name: /go back to users list/i,
    });
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith("/users");
  });
});
