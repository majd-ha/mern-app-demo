import React from "react";
//components imports
import BlogDetails from "../components/BlogDetails";
import BlogForms from "../components/BlogForms";
import Loader from "../components/Loader";
//hooks

import useFetchAll from "../hooks/useFetchAll";

export default function MyBlogs() {
  const {
    loading,
    state: st,
    error,
  } = useFetchAll(
    "https://blog-react-backend.onrender.com/api/blogs/userBlogs"
  );

  return (
    <div>
      {/* <Profile /> */}
      <div className="home">
        {loading ? (
          <Loader />
        ) : error ? (
          error
        ) : (
          <div className="blogs">
            {st.blogs?.length > 0 ? (
              st.blogs?.map((el) => {
                return <BlogDetails key={el._id} blog={el} show={true} />;
              })
            ) : (
              <p>you dont have any blogs yet, create one now !</p>
            )}
          </div>
        )}
        {!loading && <BlogForms />}
      </div>
    </div>
  );
}
