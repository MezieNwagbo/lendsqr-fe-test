import users from "../../../data/mockData/users.json";

import type { UserType } from "../types/userTypes";

export const usersMock = {
  async getUsers(page = 1, limit = 50): Promise<UserType[]> {
    const start = (page - 1) * limit;
    const end = start + limit;
    return Promise.resolve(users.slice(start, end));
  },

  async getUserById(id: string): Promise<UserType | undefined> {
    const user = users.find((u) => u.id === id);
    return Promise.resolve(user);
  },

  async getUserSummary() {
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === "Active").length;
    const usersWithLoans = Math.floor(totalUsers * 0.4);
    const usersWithSavings = Math.floor(totalUsers * 0.3);
    return Promise.resolve({
      totalUsers,
      activeUsers,
      usersWithLoans,
      usersWithSavings,
    });
  },
};
