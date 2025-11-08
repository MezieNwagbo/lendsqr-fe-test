import { useState, useEffect } from "react";
import type { UserType } from "../../types/userTypes";

export const useUserDetails = (userId: string) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (!userId) return;

    // Try to get user from localStorage
    const stored = localStorage.getItem(`user_${userId}`);
    if (stored) {
      setUser(JSON.parse(stored));
      return;
    }

    // If not in localStorage, fetch from mock
    import("../../api/users").then(({ usersMock }) => {
      usersMock.getUserById(userId).then((fetchedUser) => {
        if (fetchedUser) {
          setUser(fetchedUser);
          localStorage.setItem(`user_${userId}`, JSON.stringify(fetchedUser));
        }
      });
    });
  }, [userId]);

  return user;
};
