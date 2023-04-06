import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogDetails from "../components/BlogDetails";
import Loader from "../components/Loader";
import { useBlogContext } from "../hooks/useBlogContext";
import useFetchAll from "../hooks/useFetchAll";

export default function UserBlogs() {
  const [userblogs, setUserBlogs] = useState([]);
  const { state } = useBlogContext();
  const { id } = useParams();
  const { error, loading } = useFetchAll("/blogs");
  useEffect(() => {
    if (state.blogs) {
      const user_blogs = state.blogs?.filter((b) => b.user_id === id);
      setUserBlogs(user_blogs);
      console.log(state.blogs);
    }
  }, [id, state.blogs]);
  if (loading) {
    <Loader />;
  }
  if (error) {
    throw Error(error.message);
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        {userblogs?.length !== 0 ? (
          userblogs[0]?.owner + `’s Blogs`
        ) : (
          <p>not a valid user</p>
        )}
      </h1>
      <div className="flex flex-col gap-8">
        {userblogs?.map((b) => {
          return <BlogDetails key={b._id} blog={b} show={false} />;
        })}
      </div>
    </div>
  );
}
