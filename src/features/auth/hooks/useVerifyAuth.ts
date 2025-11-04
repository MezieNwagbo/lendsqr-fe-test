import { useEffect, useState } from "react";
import { isAuthenticated } from "../../../utils/auth";

export const useVerifyAuth = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    const handleStorageChange = () => setAuthenticated(isAuthenticated());
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return authenticated;
};
