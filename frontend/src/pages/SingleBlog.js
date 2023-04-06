import React from "react";
import Loader from "../components/Loader";
//hooks
import { useParams } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useSingleFetch } from "../hooks/useSingleFetch";

function SingleBlog() {
  const { state: st } = useAuthContext();
  const userName = st.user.user_name;
  const { id } = useParams();
  // const { state } = useBlogContext();

  const { error, loading, data } = useSingleFetch(id);

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
                    {data?.data?.owner === userName ? (
                      <>you</>
                    ) : (
                      data?.data?.owner
                    )}
                  </strong>{" "}
                </p>
                <h4>
                  {" "}
                  <strong> title : </strong> {data?.data?.title}
                </h4>
                <p>
                  {" "}
                  <strong> snippet : </strong> {data?.data?.snippet}
                </p>
                <p className="blog-body">
                  {" "}
                  <strong>Content : </strong>
                  {data?.data?.body}
                </p>{" "}
                <p>
                  {" "}
                  <strong> Likes : </strong> {data?.data?.likes?.length}
                </p>
                <div>
                  {" "}
                  <strong> people who likes : </strong>{" "}
                  {data?.data?.likes?.map((user) => (
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

export default React.memo(SingleBlog);
