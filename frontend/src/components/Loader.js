import React from "react";
import { ImSpinner2 } from "react-icons/im";
export default function Loader() {
  return (
    <div className="w-full flex justify-center items-center h-[100vh]">
      <ImSpinner2 size={"5em"} color={"e7195a"} className="animate-spin" />
    </div>
  );
}
