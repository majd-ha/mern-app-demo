import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthConrext";
import { BlogContextProvider } from "./context/BlogContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <BlogContextProvider>
      <App />
    </BlogContextProvider>
  </AuthContextProvider>
);
