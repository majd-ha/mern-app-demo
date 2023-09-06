/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";

import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import BlogDetails from "../components/BlogDetails";
import BlogForms from "../components/BlogForms";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBlogContext } from "../hooks/useBlogContext";
import useFetchAll from "../hooks/useFetchAll";
export default function Profile() {
  // eslint-disable-next-line no-unused-vars
  const { loading, error } = useFetchAll(`/blogs/userBlogs`, "my");
  const { state } = useBlogContext();
  const [isloading, setisLoading] = useState(false);
  const { state: st, dispatch } = useAuthContext();

  const inputRef = useRef();

  const [img, setImg] = useState();

  const changeimg = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Imgfile", img);
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

        setisLoading(false);
      });
  };
  if (error) {
    throw Error("Cant fetch your data");
  }
  return (
    <div className="w-[90%] mx-auto max-sm:w-[100%]">
      <div className="w-[100%]  max-sm:w-[100%] flex items-center max-sm:justify-center max-sm:flex-col my-5 p-3 rounded-lg shadow-md">
        {
          //
          isloading ? (
            <div className="rounded-full bg-[#ffffff4b] border border-pink-800 w-[250px] h-[250px] flex items-center justify-center">
              <FaSpinner
                size={"2.2rem"}
                color="#E7195A"
                className="animate-spin"
              />
            </div>
          ) : (
            //
            <div className="rounded-full bg-pink-900 w-[250px] h-[250px] flex items-center justify-center">
              <div
                className=" cursor-pointer"
                onClick={() => inputRef.current.click()}
              >
                {st.user && !img ? (
                  <img
                    src={`https://blog-react-backend.onrender.com/public/uploads/${st.user.avatar.avatar}`}
                    alt="f"
                    className="object-cover rounded-full w-[240px] h-[240px]"
                  />
                ) : (
                  <img
                    src={img && URL.createObjectURL(img)}
                    alt="f"
                    className="object-cover rounded-full w-[240px] h-[240px]"
                  />
                )}
                <input
                  type="file"
                  name="img"
                  className="hidden"
                  ref={inputRef}
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </div>
            </div>
          )
        }
        <div className="border border-transparent border-l-orange-500 px-2 mx-5 max-sm:mx-0">
          <h1>{st.user.user_name}</h1>
        </div>
      </div>
      {img && (
        <button
          onClick={changeimg}
          className="bg-green-500 px-3 py-2 rounded-lg mx-4 capitalize text-white"
        >
          save changes
        </button>
      )}
      <div>
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
    </div>
  );
}
