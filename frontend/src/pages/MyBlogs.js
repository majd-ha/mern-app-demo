import React, { useEffect, useState } from "react";
//components imports
import BlogDetails from "../components/BlogDetails";
import BlogForms from "../components/BlogForms";
import Loader from "../components/Loader";
//hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useBlogContext } from "../hooks/useBlogContext";
//pages
// import Profile from "./Profile";
export default function MyBlogs() {
  const { state } = useAuthContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { state: st, dispatch } = useBlogContext();

  useEffect(() => {
    const handleClick = async () => {
      setLoading(true);
      const response = await fetch("/api/blogs/userBlogs", {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_BLOGS", payload: json });
        setLoading(false);
      }
      if (!response.ok) {
        setError("there is a problem with your connection");
        setLoading(false);
      }
    };
    if (state.user) {
      handleClick();
    }
  }, [dispatch, state.user]);
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
              st.blogs &&
              st.blogs?.map((el) => {
                return <BlogDetails key={el._id} blog={el} show={true} />;
              })
            ) : (
              <p>you dont have any blogs yet, create one now !</p>
            )}
          </div>
        )}
        <BlogForms />
      </div>
    </div>
  );
}
