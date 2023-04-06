import { useState } from "react";

import { useAuthContext } from "./useAuthContext";
export const useSignup = () => {
  const [error, setError] = useState(null);
  // const base = "https://blog-react-backend.onrender.com/api/user/signup";
  const baseUser = "https://blog-react-backend.onrender.com/api/user";
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
