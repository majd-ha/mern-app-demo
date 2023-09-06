import { useState } from "react";

import { useAuthContext } from "./useAuthContext";
import { useLogout } from "./useLogout";

export const useLogin = () => {
  const { logout } = useLogout();
  const baseUser = "https://blog-react-backend.onrender.com/api/user";
  // const basedev = "http://localhost:4000/api/user";
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`${baseUser}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      setTimeout(() => {
        logout();
      }, 3600 * 1000 * 24 * 3);
    }
  };
  return { login, isLoading, error };
};
