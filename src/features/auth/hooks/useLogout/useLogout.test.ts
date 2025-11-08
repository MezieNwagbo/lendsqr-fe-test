import { renderHook, act } from "@testing-library/react";
import useLogout from "./useLogout";
import { vi } from "vitest";

// Mock react-router-dom navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("useLogout hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    // set some items to localStorage to test removal
    localStorage.setItem("selectedUser", "user123");
    localStorage.setItem("lendsqrAuth", JSON.stringify({ token: "abc" }));
  });

  it("should remove localStorage items and navigate to /login", () => {
    const { result } = renderHook(() => useLogout());

    act(() => {
      result.current.handleLogout();
    });

    expect(localStorage.getItem("selectedUser")).toBeNull();
    expect(localStorage.getItem("lendsqrAuth")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
