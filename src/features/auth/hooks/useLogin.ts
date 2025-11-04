import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../api/login";
import type { LoginPayload, LoginResponse } from "../types/loginTypes";

export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const response: LoginResponse = await login(data);
      console.log(response);
      localStorage.setItem("lendsqrAuth", JSON.stringify(response));
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.log("error");

      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};
