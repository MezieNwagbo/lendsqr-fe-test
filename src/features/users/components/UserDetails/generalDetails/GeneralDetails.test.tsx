import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GeneralDetails from "./GeneralDetails";
import type { UserType } from "../../../types/userTypes";

const mockUser: UserType = {
  id: "1",
  userId: "U1",
  organisation: "Lendsqr",
  username: "John Doe",
  email: "john@example.com",
  phoneNumber: "08012345678",
  dateJoined: "2023-01-01",
  status: "Active",
  userTier: 3,
  bvn: "12345678901",
  profile: {
    firstName: "John",
    lastName: "Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    gender: "Male",
    maritalStatus: "Single",
    children: 0,
    typeOfResidence: "Apartment",
  },
  education: {
    level: "B.Sc",
    employmentStatus: "Employed",
    sector: "Technology",
    duration: "3 years",
    officeEmail: "john@company.com",
    monthlyIncome: ["100,000", "200,000"],
    loanRepayment: "50,000",
  },
  socials: {
    twitter: "@johndoe",
    facebook: "facebook.com/johndoe",
    instagram: "@johndoe",
  },
  guarantor: [
    {
      firstName: "Jane",
      lastName: "Doe",
      phoneNumber: "08098765432",
      email: "jane@example.com",
      relationship: "Sibling",
    },
  ],
};

describe("GeneralDetails Component", () => {
  it("renders all sections with correct headers", () => {
    render(<GeneralDetails user={mockUser} />);

    expect(screen.getByText("Personal Information")).toBeInTheDocument();
    expect(screen.getByText("Education and Employment")).toBeInTheDocument();
    expect(screen.getByText("Socials")).toBeInTheDocument();
    expect(screen.getByText("Guarantor")).toBeInTheDocument();
  });

  it("displays personal info correctly", () => {
    render(<GeneralDetails user={mockUser} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("08012345678")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("12345678901")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Single")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("Apartment")).toBeInTheDocument();
  });

  it("displays education and employment info correctly", () => {
    render(<GeneralDetails user={mockUser} />);

    expect(screen.getByText("B.Sc")).toBeInTheDocument();
    expect(screen.getByText("Employed")).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();
    expect(screen.getByText("3 years")).toBeInTheDocument();
    expect(screen.getByText("john@company.com")).toBeInTheDocument();
    expect(screen.getByText("100,000 - 200,000")).toBeInTheDocument();
    expect(screen.getByText("50,000")).toBeInTheDocument();
  });

  it("displays guarantor info correctly", () => {
    render(<GeneralDetails user={mockUser} />);

    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("08098765432")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("Sibling")).toBeInTheDocument();
  });
});
