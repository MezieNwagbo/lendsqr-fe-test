import { renderHook, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useUserNavigation } from "./useUserNavigation";
import type { UserType } from "../../types/userTypes";
import { vi } from "vitest";

// Create a mock for useNavigate
const mockNavigate = vi.fn();

// Mock react-router-dom partially
vi.mock("react-router-dom", async () => {
  const actual: any = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("useUserNavigation hook", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  it("saves user in localStorage and navigates to details page", () => {
    const user: UserType = {
      id: "1",
      userId: "user1",
      username: "John Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      organisation: "Org",
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
        level: "Bachelors",
        employmentStatus: "employed",
        sector: "IT",
        officeEmail: "john@company.com",
        monthlyIncome: ["5000", "7000"],
        loanRepayment: "1000",
        duration: "24 months",
      },
      socials: { twitter: "", facebook: "", instagram: "" },
      guarantor: [],
      userTier: 1,
      bvn: "12345678901",
    };

    const { result } = renderHook(() => useUserNavigation(), {
      wrapper: MemoryRouter,
    });

    act(() => result.current.goToUserDetails(user));

    // Assert localStorage
    expect(localStorage.getItem("selectedUser")).toBe(JSON.stringify(user));

    // Assert navigation
    expect(mockNavigate).toHaveBeenCalledWith(`/users/${user.id}`);
  });
});
