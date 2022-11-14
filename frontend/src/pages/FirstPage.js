import React from "react";
import { Link } from "react-router-dom";

export default function FirstPage() {
  return (
    <div className="first-parent">
      <h2>Wellcome To Our Blog App</h2>
      <div className="container-land">
        <div>
          <h3>create blogs</h3>
          <p>sign & create a new blogs and other people can see it </p>
        </div>
        <div>
          <h3>sign now</h3>
          <Link to={"/signup"}> sign here </Link>
        </div>
        <div>
          <h3>browse blogs</h3>
          <p> you can browse others blogs </p>
        </div>
      </div>
    </div>
  );
}
