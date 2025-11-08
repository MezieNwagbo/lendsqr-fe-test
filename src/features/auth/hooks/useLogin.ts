import { useState } from "react";

import { login } from "../api/login";

import { useNavigate } from "react-router-dom";
import type { LoginPayload, LoginResponse } from "../types/loginTypes";

import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: LoginPayload) => {
    setLoading(true);

    try {
      const response: LoginResponse = await login(data);

      localStorage.setItem("lendsqrAuth", JSON.stringify(response));
      toast.success("Login successful!!", { duration: 4000 });
      navigate("/users");
    } catch (err: any) {
      const message = err?.message || "Invalid email or password";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
};
