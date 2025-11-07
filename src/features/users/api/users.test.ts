import { describe, it, expect, vi } from "vitest";
import { usersMock } from "./users";
import users from "../../../data/mockData/users.json";

describe("usersMock API", () => {
  // Test getUsers()
  it("returns paginated users correctly", async () => {
    const page = 1;
    const limit = 10;
    const result = await usersMock.getUsers(page, limit);

    expect(result).toHaveLength(limit);
    expect(result[0]).toHaveProperty("id");
  });

  it("returns an empty array if page exceeds user count", async () => {
    const page = 999;
    const limit = 50;
    const result = await usersMock.getUsers(page, limit);

    expect(result).toEqual([]);
  });

  // Test getUserById()
  it("returns a user if the ID exists", async () => {
    const existingUser = users[0];
    const result = await usersMock.getUserById(existingUser.id);

    expect(result).toBeDefined();
    expect(result?.id).toBe(existingUser.id);
  });

  it("returns undefined for a non-existing user", async () => {
    const result = await usersMock.getUserById("non-existent-id");
    expect(result).toBeUndefined();
  });

  // Test getUserSummary()
  it("returns the correct summary data", async () => {
    const summary = await usersMock.getUserSummary();

    expect(summary.totalUsers).toBe(users.length);
    expect(summary.activeUsers).toBe(
      users.filter((u) => u.status === "Active").length
    );
    expect(summary.usersWithLoans).toBeLessThanOrEqual(users.length);
  });

  // Optional: test delay behavior (mocking)
  it("simulates delay using setTimeout", async () => {
    const spy = vi.spyOn(global, "setTimeout");
    await usersMock.getUsers(1, 1);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
