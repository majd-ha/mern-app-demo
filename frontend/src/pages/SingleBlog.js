import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuthContext } from "../hooks/useAuthContext";
import useFetchAll from "../hooks/useFetchAll";

export default function SingleBlog() {
  const { state: st } = useAuthContext();
  const userName = st.user.email.split("@")[0];
  const par = useParams();
  const { error, loading, state } = useFetchAll(`/api/blogs/${par.id}`);

  console.log(state.blogs);
  return (
    <div>
      <div className="blog-details">
        {loading ? (
          <Loader />
        ) : (
          <div>
            {error ? (
              error
            ) : (
              <>
                {" "}
                <p>
                  {" "}
                  Owner :
                  <strong style={{ color: "#e7195a" }}>
                    {" "}
                    {state.blogs?.user_name === userName ? (
                      <>you</>
                    ) : (
                      state.blogs?.user_name
                    )}
                  </strong>{" "}
                </p>
                <h4>
                  {" "}
                  <strong> title : </strong> {state.blogs?.title}
                </h4>
                <p>
                  {" "}
                  <strong> snippet : </strong> {state.blogs?.snippet}
                </p>
                <p className="blog-body">
                  {" "}
                  <strong>Content : </strong>
                  {state.blogs?.body}
                </p>{" "}
                <p>
                  {" "}
                  <strong> Likes : </strong> {state.blogs?.likes?.length}
                </p>
                <div>
                  {" "}
                  <strong> people who likes : </strong>{" "}
                  {state.blogs?.likes?.map((user) => (
                    <p key={user}>{user}</p>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
