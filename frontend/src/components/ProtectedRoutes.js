import React from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import NotAuthenticated from "../pages/NotAuthenticated";
export default function ProtectedRoutes() {
  const { state } = useAuthContext();
  return state.user ? <Outlet /> : <NotAuthenticated />;
}
