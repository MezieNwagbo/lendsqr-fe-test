import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { LoginResponse, User } from "../types/loginTypes";

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (data: LoginResponse) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (data: LoginResponse) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("auth", JSON.stringify(data)); // optional persistence
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
  };

  // Optionally: restore user on page refresh
  React.useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const parsed: LoginResponse = JSON.parse(stored);
      setUser(parsed.user);
      setToken(parsed.token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook for easy usage
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
