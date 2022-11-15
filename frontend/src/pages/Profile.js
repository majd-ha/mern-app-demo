import React from "react";

import { useAuthContext } from "../hooks/useAuthContext";

export default function Profile() {
  const { state } = useAuthContext();
  //under dev
  return (
    <div className="profile-parent">
      <div className="image-container">
        <div>{state.user.email}</div>
      </div>
    </div>
  );
}
