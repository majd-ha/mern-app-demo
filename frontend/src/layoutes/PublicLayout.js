import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function PublicLayout() {
  const { state } = useAuthContext();
  return !state.user ? <Outlet /> : <Navigate to="/" />;
}
