import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

// Mock useLogin hook (so no real login is triggered)
vi.mock("../../features/auth/hooks/useLogin", () => ({
  useLogin: () => ({
    handleLogin: vi.fn(),
    loading: false,
  }),
}));

// Mock loginCopy to match your actual constants
vi.mock("../../constants/loginCopy", () => ({
  loginCopy: {
    title: "Welcome Back!",
    subtitle: "Enter your credentials to continue",
    forgotPasswordText: "Forgot Password?",
    fields: {
      email: { placeholder: "Email" },
      password: { placeholder: "Password" },
    },
    button: {
      label: "Log In",
      loading: "Logging in...",
    },
  },
}));

const renderLogin = () =>
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

describe("Login UI", () => {
  it("renders all logos", () => {
    renderLogin();
    const logos = screen.getAllByAltText("Company Logo");
    expect(logos.length).toBeGreaterThan(0);
  });

  it("renders the title and subtitle", () => {
    renderLogin();
    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
    expect(
      screen.getByText("Enter your credentials to continue")
    ).toBeInTheDocument();
  });

  it("renders email and password inputs with correct placeholders", () => {
    renderLogin();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("renders the forgot password link", () => {
    renderLogin();
    expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
  });

  it("renders the submit button with correct label", () => {
    renderLogin();
    const button = screen.getByRole("button", { name: "Log In" });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("shows error messages when submitting empty form", () => {
    renderLogin();
    const button = screen.getByRole("button", { name: "Log In" });
    fireEvent.click(button);

    // Both email and password errors
    const errorMessages = screen.getAllByText("Required");
    expect(errorMessages.length).toBeGreaterThanOrEqual(1);
  });
});
