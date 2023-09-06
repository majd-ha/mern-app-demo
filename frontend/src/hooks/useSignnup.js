import { useState } from "react";

import { useAuthContext } from "./useAuthContext";
import { useLogout } from "./useLogout";
export const useSignup = () => {
  const { logout } = useLogout();
  const [error, setError] = useState(null);
  // const base = "https://blog-react-backend.onrender.com/api/user/signup";
  const baseUser = "https://blog-react-backend.onrender.com/api/user";
  //const basedev = "http://localhost:4000/api/user";
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const signup = async (email, password, phone, fullname) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`${baseUser}/signup`, {
      method: "POST",
      body: JSON.stringify({ email, password, phone, user_name: fullname }),
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
      dispatch({ type: "SIGNUP", payload: json });
      setIsLoading(false);
      setTimeout(() => {
        logout();
      }, 3600 * 1000 * 24 * 3);
    }
  };
  if (
    error?.includes(
      "Could not connect to any servers in your MongoDB Atlas cluster"
    )
  ) {
    setError("there is a proplem with your connection");
  }
  return { signup, isLoading, error };
};
