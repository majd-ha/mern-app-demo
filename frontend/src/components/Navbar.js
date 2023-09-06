import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
export default function Navbar() {
  const { state } = useAuthContext();

  const { logout } = useLogout();

  const [show, setShow] = useState(false);
  return (
    <header className="rounded-3xl">
      <div className="">
        <div className="container">
          <Link to="/" className="max-sm:hidden">
            <h1> Blog</h1>
          </Link>
          <nav>
            {state.user && (
              <div className="myblogs max-sm:flex-row">
                <Link to={"/blogs/profile"}>
                  <img
                    src={`https://blog-react-backend.onrender.com/public/uploads/${state.user?.avatar.avatar}`}
                    alt="img here"
                    className="max-sm:w-[40px] max-sm:h-[40px] w-[60px] h-[60px] rounded-full object-cover"
                  />
                  <strong style={{ fontSize: "large", marginLeft: "5px" }}>
                    {state.user.user_name}
                  </strong>
                </Link>
                <button
                  className="border-none max-sm:hidden"
                  onClick={() => {
                    logout();
                  }}
                >
                  <FiLogOut />
                </button>
              </div>
            )}
            {!state.user && (
              <div>
                <Link to="/public/login">Log in</Link>
                <Link to="/public/signup">sign up</Link>
              </div>
            )}
          </nav>
          {show ? (
            <MdOutlineKeyboardArrowUp
              size={"1.5rem"}
              className="hidden max-sm:block"
              onClick={() => {
                setShow(false);
              }}
            />
          ) : (
            <MdOutlineKeyboardArrowDown
              size={"1.5rem"}
              className="hidden max-sm:block"
              onClick={() => {
                setShow(true);
              }}
            />
          )}
        </div>
      </div>
      {show && (
        <div className=" w-[100%] h-[70px] rounded-b-3xl bg-gray-300 flex justify-around items-center">
          <Link to="/">
            <h1> Blog</h1>
          </Link>
          <button
            className="border-none flex gap-2 items-center"
            onClick={() => {
              logout();
            }}
          >
            Logout <FiLogOut color={"red"} />
          </button>
        </div>
      )}
    </header>
  );
}
