import React from "react";
import BlogDetails from "../components/BlogDetails";
import Loader from "../components/Loader";
import { useBlogContext } from "../hooks/useBlogContext";
import useFetchAll from "../hooks/useFetchAll";
//const base = "https://blog-react-backend.onrender.com/api/";
export default function Home() {
  const { state } = useBlogContext();
  // const onsuccess = () => {
  //   dispatch({ type: "SET_BLOGS", payload: data?.data });
  // };
  const { loading, error } = useFetchAll("/", "all");
  if (loading) {
    return <Loader />;
  }
  if (error) {
    throw Error(error.message);
  }
  return (
    <div className="home-page">
      <div className="flex flex-col gap-5">
        {state?.blogs.length > 0 &&
          state?.blogs?.map((el) => {
            return <BlogDetails key={el._id} blog={el} show={false} />;
          })}
      </div>
    </div>
  );
}
