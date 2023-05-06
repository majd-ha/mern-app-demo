import React from "react";

export default function Footer() {
  let date = new Date();
  return (
    <div className="footer-page">
      <p> All Rights Reserved &copy; {date.getFullYear()}</p>
    </div>
  );
}
