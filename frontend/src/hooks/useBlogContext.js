import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw Error("blog context must use in the scope of provider ");
  }
  return context;
};
