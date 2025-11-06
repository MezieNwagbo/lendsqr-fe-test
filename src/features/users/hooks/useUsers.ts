import { useEffect, useState } from "react";
import { usersMock } from "../api/users";

import type { UserType, UsersSummaryType } from "../types/userTypes";

export const useUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [summary, setSummary] = useState<UsersSummaryType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const [usersResponse, summaryResponse] = await Promise.all([
          usersMock.getUsers(1, 500),
          usersMock.getUserSummary(),
        ]);

        setUsers(usersResponse);
        setSummary(summaryResponse);
      } catch (err: any) {
        console.error("Error fetching users/summary:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, summary, loading, error };
};
