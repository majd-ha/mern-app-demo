import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing">
      <h1>we are sorry , page is not found</h1>
      <span>browse our blogs </span>
      <Link to={"/"}>here</Link>
    </div>
  );
}
