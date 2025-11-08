import { renderHook } from "@testing-library/react";
import { useUserDetails } from "./useUserDetails";
import { vi } from "vitest";

// Mock user data
const mockUser = {
  id: "1",
  userId: "user1",
  organisation: "Org",
  username: "John Doe",
  email: "john@example.com",
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
    level: "BSc",
    employmentStatus: "employed",
    sector: "IT",
    officeEmail: "john@org.com",
    monthlyIncome: ["2000"],
    loanRepayment: "500",
    duration: "2 years",
  },
  socials: {
    twitter: "",
    facebook: "",
    instagram: "",
  },
  guarantor: [],
  userTier: 2,
  bvn: "12345678901",
};

// Mock the dynamic import of users API
vi.mock("../../../../api/users", () => ({
  usersMock: {
    getUserById: vi.fn(() => Promise.resolve(mockUser)),
  },
}));

describe("useUserDetails hook", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("returns null if no userId is provided", () => {
    const { result } = renderHook(() => useUserDetails(""));
    expect(result.current).toBeNull();
  });

  it("loads user from localStorage if available", () => {
    localStorage.setItem("user_user1", JSON.stringify(mockUser));
    const { result } = renderHook(() => useUserDetails("user1"));
    expect(result.current).toEqual(mockUser);
  });
});
