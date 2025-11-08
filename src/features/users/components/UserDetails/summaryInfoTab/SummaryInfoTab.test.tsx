import { render, screen } from "@testing-library/react";
import SummaryInfoTab from "./SummaryInfoTab";
import type { UserType } from "../../../types/userTypes";

// Mock user
const mockUser: UserType = {
  id: "1",
  userId: "USR123",
  organisation: "Test Org",
  username: "John Doe",
  email: "john@example.com",
  phoneNumber: "1234567890",
  dateJoined: "2025-11-08",
  status: "active",
  profile: {
    firstName: "John",
    lastName: "Doe",
    avatar: "",
    gender: "Male",
    maritalStatus: "Single",
    children: 0,
    typeOfResidence: "Apartment",
  },
  education: {
    level: "BSc",
    employmentStatus: "Employed",
    sector: "Tech",
    officeEmail: "john@company.com",
    monthlyIncome: ["1000", "2000"],
    loanRepayment: "500",
    duration: "2 years",
  },
  socials: {
    twitter: "@johndoe",
    facebook: "john.doe",
    instagram: "john.doe",
  },
  guarantor: [],
  userTier: 2,
  bvn: "12345678901",
};

describe("SummaryInfoTab Component", () => {
  it("renders username and userId correctly", () => {
    render(<SummaryInfoTab user={mockUser} />);

    expect(screen.getByTestId("username-heading")).toHaveTextContent(
      mockUser.username
    );
    expect(screen.getByTestId("userId")).toHaveTextContent(mockUser.userId);
  });

  it("renders loan repayment and bank details", () => {
    render(<SummaryInfoTab user={mockUser} />);
    expect(screen.getByTestId("loan-repayment")).toHaveTextContent("500.00");
    expect(screen.getByTestId("bank-detail")).toHaveTextContent(
      "993e34343/providus"
    );
  });

  it("renders user tier label", () => {
    render(<SummaryInfoTab user={mockUser} />);
    expect(screen.getByTestId("user-tier-label")).toHaveTextContent(
      "User Tier"
    );
  });

  it("renders tabs with General details active", () => {
    render(<SummaryInfoTab user={mockUser} />);
    const generalTab = screen.getByRole("button", { name: /General details/i });
    expect(generalTab).toHaveClass("active");
    expect(generalTab).toHaveAttribute("aria-current", "page");
  });
});
