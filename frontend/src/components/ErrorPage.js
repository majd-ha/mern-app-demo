import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div>
      <h2>oops...! seems we have error</h2>
      {error.message}
    </div>
  );
}
