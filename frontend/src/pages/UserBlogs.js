import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogDetails from "../components/BlogDetails";
import Loader from "../components/Loader";
import useFetchAll from "../hooks/useFetchAll";

export default function UserBlogs() {
  const [userblogs, setUserBlogs] = useState([]);

  const { id } = useParams();
  const { error, loading, state } = useFetchAll("/api/blogs/");
  useEffect(() => {
    if (state.blogs) {
      const user_blogs = state.blogs?.filter((b) => b.user_id === id);
      setUserBlogs(user_blogs);
    }
  }, [id, state.blogs]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <>{error}</>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>
            {userblogs?.length !== 0 ? (
              userblogs[0]?.user_name + `’s Blogs`
            ) : (
              <p>not a valid user</p>
            )}
          </h1>
          {userblogs?.map((b) => {
            return <BlogDetails key={b._id} blog={b} show={false} />;
          })}
        </>
      )}
    </div>
  );
}
