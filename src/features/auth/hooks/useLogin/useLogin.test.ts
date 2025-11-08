import { renderHook, act } from "@testing-library/react";
import { useLogin } from "./useLogin";
import * as loginApi from "../../api/login";
import { vi } from "vitest";

// Mock react-router-dom navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("useLogin hook", () => {
  const mockData = { email: "test@example.com", password: "123456" };
  const mockResponse = { token: "abc123" };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should set loading true during login and false after success", async () => {
    // Create a controllable promise
    let resolveLogin: (value: any) => void;
    const loginPromise = new Promise((resolve) => {
      resolveLogin = resolve;
    });

    vi.spyOn(loginApi, "login").mockReturnValue(loginPromise as any);

    const { result } = renderHook(() => useLogin());

    // Start login
    act(() => {
      result.current.handleLogin(mockData);
    });

    // Immediately after calling, loading should be true
    expect(result.current.loading).toBe(true);

    // Resolve the login promise
    await act(async () => {
      resolveLogin!(mockResponse);
      await loginPromise;
    });

    // After promise resolves
    expect(result.current.loading).toBe(false);
    expect(localStorage.getItem("lendsqrAuth")).toEqual(
      JSON.stringify(mockResponse)
    );
    expect(mockNavigate).toHaveBeenCalledWith("/users");
  });

  it("should handle login failure", async () => {
    vi.spyOn(loginApi, "login").mockRejectedValue(new Error("Login failed"));

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleLogin(mockData);
    });

    expect(result.current.loading).toBe(false);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
