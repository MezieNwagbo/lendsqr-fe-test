import { renderHook, act } from "@testing-library/react";
import { useUsers } from "./useUsers";
import { usersMock } from "../../api/users";
import { vi } from "vitest";

// Mock the usersMock methods
vi.mock("../../api/users", () => ({
  usersMock: {
    getUsers: vi.fn(),
    getUserSummary: vi.fn(),
  },
}));

describe("useUsers hook", () => {
  const mockUsers = [{ id: "1", username: "John Doe", userId: "user1" }];
  const mockSummary = { totalUsers: 1, active: 1, inactive: 0 };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches users and summary successfully", async () => {
    (usersMock.getUsers as any).mockResolvedValue(mockUsers);
    (usersMock.getUserSummary as any).mockResolvedValue(mockSummary);

    let result: any;

    await act(async () => {
      result = renderHook(() => useUsers()).result;
      // let the promises resolve
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.summary).toEqual(mockSummary);
    expect(result.current.error).toBeNull();
  });
});
