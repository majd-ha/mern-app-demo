import React from "react";

export default function Footer() {
  let date = new Date();
  return (
    <div className="footer-page">
      <p>all rights recived &copy; {date.getFullYear()}</p>
    </div>
  );
}
