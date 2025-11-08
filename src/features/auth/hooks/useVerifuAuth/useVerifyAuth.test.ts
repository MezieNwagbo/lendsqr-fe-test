import { renderHook, act } from "@testing-library/react";
import { useVerifyAuth } from "./useVerifyAuth";

describe("useVerifyAuth hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return false if not authenticated", () => {
    const { result } = renderHook(() => useVerifyAuth());
    expect(result.current).toBe(false);
  });

  it("should return true if authenticated", () => {
    localStorage.setItem("lendsqrAuth", JSON.stringify({ token: "123" }));
    const { result } = renderHook(() => useVerifyAuth());
    expect(result.current).toBe(true);
  });

  it("should update authentication state when localStorage changes", () => {
    // Start unauthenticated
    const { result } = renderHook(() => useVerifyAuth());
    expect(result.current).toBe(false);

    // Simulate login
    localStorage.setItem("lendsqrAuth", JSON.stringify({ token: "123" }));
    act(() => {
      window.dispatchEvent(new StorageEvent("storage", { key: "lendsqrAuth" }));
    });

    expect(result.current).toBe(true);

    // Simulate logout
    localStorage.removeItem("lendsqrAuth");
    act(() => {
      window.dispatchEvent(new StorageEvent("storage", { key: "lendsqrAuth" }));
    });

    expect(result.current).toBe(false);
  });
});
