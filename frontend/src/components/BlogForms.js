import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBlogContext } from "../hooks/useBlogContext";

export default function BlogForms() {
  const { dispatch } = useBlogContext();
  const { state } = useAuthContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [snippet, setSnippet] = useState("");
  const [error, setErorr] = useState(null);
  const titlRef = useRef();
  const bodyRef = useRef();
  const sinpRef = useRef();

  useEffect(() => {
    if (title !== "" && body !== "" && snippet !== "") {
      fetch("/api/blogs/", {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
          snippet,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.title) {
            setErorr(data.error);
          } else {
            setErorr(null);

            titlRef.current.value = "";
            sinpRef.current.value = "";
            bodyRef.current.value = "";

            dispatch({ type: "CREATE_BLOG", payload: data });
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, snippet, body, title]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!state.user) {
      setErorr("you must be logged in to add a BLOG");
      return;
    }
    if (
      titlRef.current.value !== "" &&
      bodyRef.current.value !== "" &&
      sinpRef.current.value !== ""
    ) {
      setTitle(titlRef.current.value);
      setBody(bodyRef.current.value);
      setSnippet(sinpRef.current.value);
    } else {
      setErorr("all fields are required");
    }
  };
  return (
    <form className="create" onSubmit={handelSubmit}>
      <h3>Add a new blog</h3>
      <label>Blog title : </label>
      <input type={"text"} defaultValue={title} ref={titlRef} />

      <label> snippet : </label>
      <input type={"text"} defaultValue={snippet} ref={sinpRef} />

      <label>body : </label>
      <textarea defaultValue={body} ref={bodyRef} rows="4" cols="50"></textarea>

      <button>Add Blog</button>
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
    </form>
  );
}
