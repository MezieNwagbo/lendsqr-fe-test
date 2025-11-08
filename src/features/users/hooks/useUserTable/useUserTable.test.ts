import { renderHook, act } from "@testing-library/react";
import useUserTable from "./useUserTable";
import type { UserType } from "../../types/userTypes";

// Minimal mock users
const mockUser: UserType = {
  id: "1",
  userId: "user1",
  organisation: "Lendsqr",
  username: "John Doe",
  email: "john.doe@example.com",
  phoneNumber: "1234567890",
  dateJoined: "2025-01-01",
  status: "active",
  profile: {
    firstName: "John",
    lastName: "Doe",
    avatar: "",
    gender: "male",
    maritalStatus: "single",
    children: 0,
    typeOfResidence: "apartment",
  },
  education: {
    level: "B.Sc",
    employmentStatus: "employed",
    sector: "tech",
    officeEmail: "john.doe@lendsqr.com",
    monthlyIncome: ["200000", "250000"],
    loanRepayment: "5000",
    duration: "2 years",
  },
  socials: {
    twitter: "@johndoe",
    facebook: "johndoe",
    instagram: "johndoe",
  },
  guarantor: [
    {
      firstName: "Jane",
      lastName: "Doe",
      phoneNumber: "0987654321",
      email: "jane.doe@example.com",
      relationship: "sister",
    },
  ],
  userTier: 2,
  bvn: "12345678901",
};

// Create multiple users for pagination
const mockUsers: UserType[] = Array.from({ length: 25 }, (_, i) => ({
  ...mockUser,
  id: `${i + 1}`,
  userId: `user${i + 1}`,
  username: `User ${i + 1}`,
}));

describe("useUserTable hook", () => {
  it("should return initial paginated users and default state", () => {
    const { result } = renderHook(() => useUserTable(mockUsers));

    // Default pagination: page 1, 10 rows per page
    expect(result.current.currentPage).toBe(1);
    expect(result.current.rowsPerPage).toBe(10);
    expect(result.current.paginatedUsers.length).toBe(10);
    expect(result.current.rowCount).toBe(25);
    expect(result.current.anchorEl).toBeNull();
  });

  it("should handle page change", () => {
    const { result } = renderHook(() => useUserTable(mockUsers));

    act(() => {
      result.current.handleChangePage(2);
    });

    expect(result.current.currentPage).toBe(2);
    // Page 2 should still have 10 users
    expect(result.current.paginatedUsers[0].id).toBe("11");
  });

  it("should handle rows per page change", () => {
    const { result } = renderHook(() => useUserTable(mockUsers));

    act(() => {
      result.current.handleChangeRowsPerPage(20);
    });

    expect(result.current.rowsPerPage).toBe(20);
    expect(result.current.currentPage).toBe(1); // Reset to page 1
    expect(result.current.paginatedUsers.length).toBe(20);
  });

  it("should toggle anchor element on sort icon click", () => {
    const { result } = renderHook(() => useUserTable(mockUsers));

    const mockEvent = {
      currentTarget: document.createElement("div"),
      stopPropagation: () => {},
    } as unknown as React.MouseEvent<HTMLElement>;

    // Initially null
    expect(result.current.anchorEl).toBeNull();

    act(() => {
      result.current.handleSortIconClick(mockEvent);
    });
    expect(result.current.anchorEl).not.toBeNull();

    act(() => {
      result.current.handleSortIconClick(mockEvent);
    });
    expect(result.current.anchorEl).toBeNull();
  });
});
