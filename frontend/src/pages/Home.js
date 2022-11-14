import React from "react";
import BlogDetails from "../components/BlogDetails";
import Loader from "../components/Loader";
import useFetchAll from "../hooks/useFetchAll";

export default function Home() {
  const { loading, error, state } = useFetchAll("/api/blogs/");

  return (
    <div className="home-page">
      {loading ? (
        <Loader />
      ) : (
        <div className="blogs">
          {error}
          {state.blogs?.length > 0 &&
            state.blogs?.map((el) => {
              return <BlogDetails key={el._id} blog={el} show={false} />;
            })}
        </div>
      )}
    </div>
  );
}
