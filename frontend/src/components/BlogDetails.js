import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useBlogContext } from "../hooks/useBlogContext";

export default function BlogDetails({ blog, show }) {
  const { state } = useAuthContext();
  const userName = state.user.email.split("@")[0];
  const wholikeRef = useRef();
  const [shown, setShown] = useState(true);

  const showLiks = () => {
    if (shown) {
      setShown(false);
      wholikeRef.current.style.display = "flex";
    } else {
      setShown(true);
      wholikeRef.current.style.display = "none";
    }
  };
  const likBlog = async () => {
    const response = await fetch(`/api/blogs/addlike/${blog._id}`, {
      method: "PATCH",
      body: JSON.stringify({ email: state.user.email }),
      headers: {
        Authorization: `Bearer ${state.user.token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const response = await fetch(`/api/blogs/${blog._id}/`, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "UPDATE_BLOG", payload: data });
      }
    }
  };
  const { dispatch } = useBlogContext();
  const handleClick = async () => {
    if (!state.user || userName !== blog.user_name) {
      return;
    }
    const response = await fetch(`/api/blogs/${blog._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${state.user.token}`,
      },
    });
    const json = await response.json();
    if (json) {
      dispatch({ type: "DELETE_BLOG", payload: json });
    }
  };

  return (
    <div className="blog-details">
      <div className="blog-title">
        <span className="material-symbols-outlined">account_circle</span>
        <Link to={`/users/${blog.user_id}`}> {blog.user_name}</Link>{" "}
      </div>
      {!show && (
        <Link to={`/blogs/${blog._id}`}>
          {" "}
          <span id="info" className="material-symbols-outlined">
            info
          </span>
        </Link>
      )}
      <div id="time">
        <span className="material-symbols-outlined">public</span>
        <p>
          {" "}
          {formatDistanceToNow(new Date(blog.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>

      {show && <p>snippet : {blog.snippet}</p>}

      <p className="blog-body"> {blog.body}</p>

      {show && (
        <span
          id="del"
          className="material-symbols-outlined"
          onClick={handleClick}
        >
          delete
        </span>
      )}

      <div className="footer-blog-container">
        <div className="footer-blog">
          <button
            onClick={likBlog}
            style={
              blog.likes.includes(state.user.email)
                ? { color: "blue" }
                : { color: "grey" }
            }
          >
            <span className="material-symbols-outlined">thumb_up</span>
          </button>
          <p>{blog.likes?.length}</p>
        </div>
        <div
          style={{ alignItems: "center", cursor: "pointer" }}
          onClick={showLiks}
        >
          <span className="material-symbols-outlined">menu</span>
        </div>
      </div>
      <div className="who-like" ref={wholikeRef}>
        {blog.likes.map((el) => {
          if (el === state.user.email) {
            return (
              <p
                key={el}
                style={{
                  color: "blue",
                }}
              >
                You
              </p>
            );
          } else {
            return <p key={el}>{el.split("@")[0]}</p>;
          }
        })}
      </div>
    </div>
  );
}
