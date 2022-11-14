import React from "react";
// import BlogForms from "../components/BlogForms";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Profile() {
  const { state } = useAuthContext();

  return (
    <div className="profile-parent">
      <div className="image-container">
        <div>{state.user.email}</div>
        {/* <BlogForms /> */}
      </div>
    </div>
  );
}
