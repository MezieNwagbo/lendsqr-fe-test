import { useState } from "react";

import { login } from "../api/login";
import type { LoginPayload, LoginResponse } from "../types/loginTypes";

import toast from "react-hot-toast";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: LoginPayload) => {
    setLoading(true);

    try {
      const response: LoginResponse = await login(data);

      localStorage.setItem("lendsqrAuth", JSON.stringify(response));
      toast.success("Login successful! Redirecting...");
      setTimeout(() => (window.location.href = "/user"), 1200);
    } catch (err: any) {
      const message = err?.message || "Invalid email or password";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
};
