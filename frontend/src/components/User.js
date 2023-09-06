import React from "react";
import { Link } from "react-router-dom";

export default function User({ usr }) {
  return (
    <Link to={`/blogs/users/${usr.usr_id}`} className="flex items-center gap-1">
      <img
        src={`https://blog-react-backend.onrender.com/public/uploads/${usr?.avatar}`}
        alt="img here"
        className="max-sm:w-[25px] max-sm:h-[25px] w-[40px] h-[40px] rounded-full object-cover"
      />
      <strong style={{ marginLeft: "5px" }}>{usr.name}</strong>
    </Link>
  );
}
