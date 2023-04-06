import axios from "axios";
import { imagefrombuffer } from "imagefrombuffer";
import React, { useRef, useState } from "react";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import standard from "../imgaes/standard-profile.jpg";
//components imports
import BlogDetails from "../components/BlogDetails";
import BlogForms from "../components/BlogForms";
import Loader from "../components/Loader";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBlogContext } from "../hooks/useBlogContext";
//hooks

import useFetchAll from "../hooks/useFetchAll";

export default function MyBlogs() {
  const [isChosed, setisChosed] = useState(false);
  const formref = useRef();
  const [isloading, setisLoading] = useState(false);
  const { state: st, dispatch } = useAuthContext();
  const { state } = useBlogContext();
  // const base = "https://blog-react-backend.onrender.com/api/blogs/";
  const { loading, error } = useFetchAll(`/blogs/userBlogs`, "my");

  const changImg = (e) => {
    e.preventDefault();
    const formData = new FormData(formref.current);
    setisLoading(true);
    axios
      .patch(`/user/updateimg/${st.user.user_name}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${st?.user?.token}`,
        },
      })
      .then((res) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const newuser = { ...user, avatar: res.data };
        dispatch({ type: "LOGIN", payload: newuser });
        localStorage.setItem("user", JSON.stringify(newuser));

        setisChosed(false);
        setisLoading(false);
      });
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    throw Error(`couldnt load your blogs , ${error.message}`);
  }
  return (
    <div className="w-full">
      {/* <Profile /> */}
      <div className="max-sm:w-full w-[80%] max-sm:flex-col flex items-center  mt-5 ">
        <div className=" w-[250px] h-[250px] max-sm:w-[170px] max-sm:h-[170px] rounded-full bg-gray-700">
          {isloading ? (
            <FaSpinner className="animate-spin" />
          ) : st.user.avatar ? (
            <img
              src={imagefrombuffer({
                type: st?.user?.avatar.avatar.type,
                data: st?.user?.avatar.avatar.data,
              })}
              alt="img here"
              className="max-sm:w-[170px] max-sm:h-[170px] w-[250px] h-[250px] rounded-full object-cover"
            />
          ) : (
            <img
              src={standard}
              alt="img here"
              className="max-sm:w-[170px] max-sm:h-[170px] w-[250px] h-[250px] rounded-full object-cover"
            />
          )}
        </div>

        <div className="p-5">
          <h1 className="text-center">{st.user.user_name}</h1>
        </div>
      </div>
      <form onSubmit={changImg} ref={formref} className="my-5 block">
        <label
          htmlFor="imageupload"
          className="hover:flex justify-around rounded-2xl h-[2rem] duration-1000 transition-all items-center hover:border border-green-600 m-3 w-[2rem] overflow-hidden hover:w-fit "
        >
          <BsFillPatchPlusFill size={"2rem"} className="text-green-500" />
          <p> upload New profile pic</p>
        </label>
        <input
          id="imageupload"
          type="file"
          name="avatar"
          className="opacity-0 hidden"
          onChange={() => {
            setisChosed(true);
          }}
        />
        <button className={isChosed ? "block" : "hidden"}>apply</button>
      </form>
      {/* endprofile */}
      <div className="">
        <div className="flex flex-col gap-5">
          {state?.blogs?.length > 0 ? (
            state.blogs?.map((el) => {
              return <BlogDetails key={el._id} blog={el} show={true} />;
            })
          ) : (
            <p>you dont have any blogs yet, create one now !</p>
          )}
        </div>

        {!loading && <BlogForms />}
      </div>
    </div>
  );
}
