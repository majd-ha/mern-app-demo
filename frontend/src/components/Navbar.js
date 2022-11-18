import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
export default function Navbar() {
  const { state } = useAuthContext();

  const { logout } = useLogout();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1> Blog</h1>
        </Link>
        <nav>
          {state.user && (
            <div className="myblogs">
              <Link to={"/myblogs"}>
                <span className="material-symbols-outlined">
                  account_circle
                </span>
                <strong style={{ fontSize: "large", marginLeft: "5px" }}>
                  {state.user.user_name}
                </strong>
              </Link>
              <button
                onClick={() => {
                  logout();
                }}
              >
                Log out
              </button>
            </div>
          )}
          {!state.user && (
            <div>
              <Link to="/login">Log in</Link>
              <Link to="/signup">sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
