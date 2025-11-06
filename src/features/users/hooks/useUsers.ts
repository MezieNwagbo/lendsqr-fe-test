import { useEffect, useState } from "react";
import { usersMock } from "../api/users";

import type { UserType, UsersSummaryType } from "../types/userTypes";

export const useUsers = () => {
  const [data, setData] = useState<UserType[]>([]);
  const [summary, setSummary] = useState<UsersSummaryType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const [usersResponse, summaryResponse] = await Promise.all([
          usersMock.getUsers(1, 50),
          usersMock.getUserSummary(),
        ]);

        console.log("Fetched users:", usersResponse);
        console.log("Fetched summary:", summaryResponse);

        setData(usersResponse);
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

  return { data, summary, loading, error };
};
