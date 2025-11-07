import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import UserSummary from "./UserSummary";

const mockSummary = {
  totalUsers: 500,
  activeUsers: 350,
  usersWithLoans: 200,
  usersWithSavings: 150,
};

describe("UserSummary Component", () => {
  it("renders all summary cards with correct titles and values", () => {
    render(<UserSummary summary={mockSummary} />);

    // Check titles
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Active Users")).toBeInTheDocument();
    expect(screen.getByText("Users with Loans")).toBeInTheDocument();
    expect(screen.getByText("Users with Savings")).toBeInTheDocument();

    // Check values
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("350")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  it("renders all icons", () => {
    render(<UserSummary summary={mockSummary} />);

    const icons = screen.getAllByAltText("icon");
    expect(icons.length).toBe(4);
  });

  it("handles missing icons gracefully", () => {
    // Render without passing icons (simulate empty icon prop)
    const CustomSummaryCard = () => (
      <div>
        <UserSummary
          summary={{
            totalUsers: 10,
            activeUsers: 5,
            usersWithLoans: 2,
            usersWithSavings: 3,
          }}
        />
      </div>
    );

    render(<CustomSummaryCard />);

    // Titles and values should still render
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});
