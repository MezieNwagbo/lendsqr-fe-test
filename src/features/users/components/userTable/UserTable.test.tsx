import { render, screen, fireEvent } from "@testing-library/react";
import UserTable from "./UserTable";
import type { UserType } from "../../types/userTypes";
import { vi } from "vitest";

// Mock hooks
const mockGoToUserDetails = vi.fn();
vi.mock("../../hooks/useUserNavigation/useUserNavigation", () => ({
  useUserNavigation: () => ({ goToUserDetails: mockGoToUserDetails }),
}));

vi.mock("../../hooks/useUserTableColumns", () => ({
  default: () => ({
    columns: [{ name: "Username", selector: (row: any) => row.username }],
  }),
  __esModule: true,
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
  __esModule: true,
}));

vi.mock("../filterDropdown/FilterDropdown", () => ({
  default: () => <div>FilterDropdownMock</div>,
}));

vi.mock("../../components/tablePagination/TablePagination", () => ({
  default: ({ rowCount }: any) => <div>PaginationMock {rowCount}</div>,
}));

const mockUsers: UserType[] = [
  {
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
      level: "B.Sc",
      employmentStatus: "employed",
      sector: "tech",
      officeEmail: "john@org.com",
      monthlyIncome: ["1000", "2000"],
      loanRepayment: "500",
      duration: "12 months",
    },
    socials: { twitter: "", facebook: "", instagram: "" },
    guarantor: [],
    userTier: 2,
    bvn: "12345678901",
  },
];

describe("UserTable Component", () => {
  beforeEach(() => {
    mockGoToUserDetails.mockClear();
  });

  it("renders user table with data", () => {
    render(<UserTable users={mockUsers} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("FilterDropdownMock")).toBeInTheDocument();
  });

  it("calls goToUserDetails when a row is clicked", () => {
    render(<UserTable users={mockUsers} />);
    fireEvent.click(screen.getByText("John Doe"));
    expect(mockGoToUserDetails).toHaveBeenCalledWith(mockUsers[0]);
  });
});
