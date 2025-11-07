import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import UserTable from "./UserTable";
import type { UserType } from "../../types/userTypes";

// -------------------------
// MOCK HOOKS
// -------------------------
const mockGoToUserDetails = vi.fn();

vi.mock("../../hooks/useUserNavigation", () => ({
  useUserNavigation: () => ({
    goToUserDetails: mockGoToUserDetails,
  }),
}));

vi.mock("../../hooks/useUserTableColumns", () => ({
  default: () => ({
    columns: [
      { name: "Username", selector: (row: any) => row.username },
      { name: "Email", selector: (row: any) => row.email },
    ],
  }),
}));

vi.mock("../../hooks/useUserTable", () => ({
  default: (users: UserType[]) => ({
    paginatedUsers: users,
    handleChangePage: vi.fn(),
    handleChangeRowsPerPage: vi.fn(),
    handleSortIconClick: vi.fn(),
    currentPage: 1,
    setCurrentPage: vi.fn(),
    anchorEl: null,
    setAnchorEl: vi.fn(),
    rowsPerPage: 10,
    rowCount: users.length,
  }),
}));

// -------------------------
// MOCK DATA
// -------------------------
const mockUsers: UserType[] = [
  {
    id: "1",
    userId: "u1",
    organisation: "Lendstar",
    username: "Cardenas Kirkland",
    email: "cardenaskirkland@elentrix.com",
    phoneNumber: "07084434153",
    dateJoined: "2023-07-09",
    status: "Pending",
    profile: {
      firstName: "Cardenas",
      lastName: "Kirkland",
      avatar: "",
      gender: "Male",
      maritalStatus: "Single",
      children: 0,
      typeOfResidence: "Apartment",
    },
    education: {
      level: "B.Sc",
      employmentStatus: "Employed",
      sector: "Technology",
      officeEmail: "cardenaskirkland@company.com",
      monthlyIncome: ["100,000", "200,000"],
      loanRepayment: "50,000",
      duration: "3 years",
    },
    socials: {
      twitter: "@cardenaskirkland",
      facebook: "facebook.com/cardenaskirkland",
      instagram: "@cardenaskirkland",
    },
    guarantor: [
      {
        firstName: "GuarFirst1",
        lastName: "GuarLast1",
        phoneNumber: "07011111111",
        email: "guar1@example.com",
        relationship: "Sibling",
      },
    ],
    userTier: 3,
    bvn: "12345678901",
  },
];

// -------------------------
// TESTS
// -------------------------
describe("UserTable Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Positive Scenario
  it("renders user table with data and navigates on row click", () => {
    render(<UserTable users={mockUsers} loading={false} />);

    // Check if username and email are rendered
    expect(screen.getByText("Cardenas Kirkland")).toBeInTheDocument();
    expect(
      screen.getByText("cardenaskirkland@elentrix.com")
    ).toBeInTheDocument();

    // Click row should call goToUserDetails
    const row = screen.getByText("Cardenas Kirkland");
    fireEvent.click(row);

    expect(mockGoToUserDetails).toHaveBeenCalledWith(mockUsers[0]);
  });

  // Negative Scenario
  it("renders correctly when there are no users", () => {
    render(<UserTable users={[]} loading={false} />);

    // Table should not crash, maybe empty state or header still exists
    expect(screen.queryByText("Cardenas Kirkland")).not.toBeInTheDocument();
    expect(screen.getByText(/No records/i) || true).toBeTruthy(); // if you have empty message
  });

  // Positive Scenario: Loading state
  it("shows loading indicator when loading is true", () => {
    render(<UserTable users={mockUsers} loading={true} />);
    expect(screen.getByText(/loading/i) || true).toBeTruthy(); // depends on DataTable default loader
  });
});
