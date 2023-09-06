import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { CgUserList } from "react-icons/cg";
import { FaSpinner } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { RiAccountCircleLine, RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBlogContext } from "../hooks/useBlogContext";
import User from "./User";
export default function BlogDetails({ blog, show }) {
  const [comment, setComment] = useState("");
  const commentref = useRef();
  const { state } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [toggletab, setToggleTab] = useState(true);
  const userName = state.user.user_name;

  const [shown, setShown] = useState(false);

  const showLiks = () => {
    if (shown) {
      setShown(false);
    } else {
      setShown(true);
    }
  };
  // const testlike = () => {
  //   const myemail = { email: state.user.user_name };
  //   mutate(`addlike/${blog._id}`, myemail);
  // };
  const base = "https://blog-react-backend.onrender.com/api/blogs";
  //const basedev = "http://localhost:4000/api/blogs";
  const likBlog = async () => {
    setIsLoading(true);
    const response = await fetch(`${base}/addlike/${blog._id}`, {
      method: "PATCH",
      body: JSON.stringify({ email: state.user.user_name }),
      headers: {
        Authorization: `Bearer ${state.user.token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    // updated
    if (response.ok) {
      dispatch({ type: "UPDATE_BLOG", payload: data });
      // const responseBlog = await fetch(
      //   `http://localhost:4000/api/blogs/${blog._id}/`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${state.user.token}`,
      //     },
      //   }
      // );
      // const data = await responseBlog.json();
      // if (responseBlog.ok) {

      //   setIsLoading(false);
      // }
      setIsLoading(false);
    }
  };

  const { dispatch } = useBlogContext();
  const handleClick = async () => {
    if (!state.user || userName !== blog.owner) {
      return;
    }
    const response = await fetch(`${base}/${blog._id}`, {
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

  const addComment = async () => {
    commentref.current.value = "";
    commentref.current.blur();
    setIsLoading(true);
    const response = await fetch(`${base}/${blog._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        user: {
          name: state.user.user_name,
          avatar: state.user.avatar.avatar,
          usr_id: state.user.id,
        },

        comment: comment,
      }),
      headers: {
        Authorization: `Bearer ${state.user.token}`,
        "Content-Type": "application/json",
      },
    });
    // const jsonresult = await response.json();
    const reJson = await response.json();

    if (response) {
      dispatch({ type: "UPDATE_BLOG", payload: reJson });
      setIsLoading(false);
      setError(false);
    } else {
      setIsLoading(false);
      setError(true);
    }
  };
  return (
    <div className="w-[80%] max-sm:w-[90%] min-h-[250px] bg-white flex flex-col shadow-md rounded-lg p-4 mx-auto">
      {/* head */}
      <div className="flex justify-between items-center p-2">
        {/* head/user */}
        <div className="w-fit flex justify-between gap-3 items-center">
          {blog.owner_avatar ? (
            <img
              src={`https://blog-react-backend.onrender.com/public/uploads/${blog.owner_avatar}`}
              alt="img here"
              className="max-sm:w-[2rem] max-sm:h-[2rem] w-[2.5rem] h-[2.5rem] rounded-full object-cover"
            />
          ) : (
            <RiAccountCircleLine
              color="gray"
              size={"2.5rem"}
              className="max-sm:w-[1.8rem]"
            />
          )}
          <Link
            to={`/blogs/users/${blog.user_id}`}
            className="text-xl max-sm:text-sm text-center my-auto"
          >
            {" "}
            {blog.owner}
          </Link>{" "}
        </div>
        <div>
          {!show ? (
            <Link to={`/blogs/${blog._id}`}>
              <BsInfoCircle color="gray" size={"1.5rem"} />
            </Link>
          ) : (
            <div onClick={handleClick}>
              <RiDeleteBinLine size={"1.5rem"} />
            </div>
          )}
        </div>
      </div>
      {/* under head */}
      <div className="pl-5 text-gray-500 flex gap-2 items-center">
        <BiTime />
        <p className="text-xs">
          {" "}
          {formatDistanceToNow(new Date(blog.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      {/* body */}
      <div className="p-5 pt-8 ">
        <div className="leading-8 max-w-[100%] break-words"> {blog.body}</div>
      </div>

      {/* control */}
      <div className="w-full flex justify-between p-5 items-center">
        {/* control/like */}
        <div className="flex gap-3">
          <button
            disabled={isLoading}
            onClick={likBlog}
            className="text-red-700"
          >
            {blog.likes.includes(state.user.user_name) ? (
              <AiFillHeart size={"1.7rem"} />
            ) : (
              <AiOutlineHeart size={"1.7rem"} />
            )}
          </button>
          <p>{blog.likes?.length}</p>
        </div>
        {/* control/listbtn */}
        <div className="cursor-pointer" onClick={showLiks}>
          <CgUserList size={"1.7rem"} color={"gray"} />
        </div>
      </div>
      {/* comments */}
      <div
        className={
          shown
            ? " h-fit p-5 rounded-lg  bg-[rgb(0,0,0,0.1)] max-sm:p-1 "
            : "hidden"
        }
      >
        <div className="w-[90%] h-[100%] ml-[5%] rounded-lg shadow-lg bg-white max-sm:w-full max-sm:m-0">
          <div className="flex justify-between p-5 items-center h-[10%]">
            <div
              onClick={() => setToggleTab(true)}
              className={`max-sm:text-sm cursor-pointer  ${
                toggletab
                  ? "text-red-500 border border-transparent border-b-red-500 cursor-pointer "
                  : ""
              } `}
            >
              Likes
            </div>
            <div
              onClick={() => setToggleTab(false)}
              className={`max-sm:text-sm cursor-pointer  ${
                !toggletab
                  ? "text-red-500 border border-transparent border-b-red-500 cursor-pointer "
                  : ""
              } `}
            >
              Comments
            </div>
          </div>
          <div className="w-full h-[80%]">
            {toggletab ? (
              <div className="p-5 flex flex-col gap-5 items-center">
                {" "}
                {blog.likes.map((el) => {
                  if (el === state.user.user_name) {
                    return (
                      <p
                        key={el}
                        style={{
                          color: "red",
                        }}
                      >
                        You
                      </p>
                    );
                  } else {
                    return <p key={el}>{el}</p>;
                  }
                })}
              </div>
            ) : (
              <div className="p-5  max-sm:p-1">
                <div className="overflow-y-auto max-h-screen">
                  {blog?.comments.map((el) => {
                    return (
                      <div
                        key={el.commentid}
                        className="p-2 bg-gray-200 rounded-lg my-2 max-sm:p-1"
                      >
                        <User usr={el.user} />
                        <p className="bold pt-2 break-words text-sm">
                          {el.comment}
                        </p>
                      </div>
                    );
                  })}
                </div>{" "}
                <div
                  className={`flex justify-between items-center h-fit ${
                    Error ? "border border-red-800" : ""
                  }`}
                >
                  <input
                    type="text"
                    placeholder="write your comment"
                    className="h-[2.5rem] m-0 p-1  rounded-3xl indent-3 "
                    ref={commentref}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                  <button onClick={addComment}>
                    {isLoading ? (
                      <FaSpinner
                        size={"2.2rem"}
                        color="#E7195A"
                        className="animate-spin"
                      />
                    ) : (
                      <MdSend size={"2.5rem"} color="#E7195A" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
