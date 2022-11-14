import { useContext } from "react";
import { AuthContext } from "../context/AuthConrext";
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};
