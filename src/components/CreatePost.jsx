import React, { useState } from "react";
import Avatar from "react-avatar";
import Profile from "../assets/profile.jpg";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { BLOG_API_END_POINT } from "../utils/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, getisActive, toggleRefresh } from "../redux/blogsSlics";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector(store => store.blogs);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    if (!description.trim()) {
      return toast.error("Description cannot be empty.");
    }
    if (!user?._id) {
      return toast.error("User ID is missing. Please log in again.");
    }

    try {
      const res = await axios.post(
        `${BLOG_API_END_POINT}/create`,
        { description, id: user._id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(toggleRefresh());
        toast.success(res.data.message);
        setDescription("");
      } else {
        toast.error(res.data.message || "Failed to create post.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  const foryou = () => {
    dispatch(getisActive(true))
  }
  const followinghandler = () => {

    dispatch(getisActive(false))
  }


  return (
    <div className="w-[100%]">
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <div
            onClick={foryou}
            className={`text-center hover:bg-gray-200 w-full px-4 py-3 cursor-pointer hover:rounded-lg ${isActive ? "border-b-4 border-orange-500" : ""
              }`}
          >
            <h1 className="font-bold text-gray-400 text-lg">News For You</h1>
          </div>

          <div onClick={followinghandler} className={`text-center hover:bg-gray-200 w-full px-4 py-3 cursor-pointer hover:rounded-lg ${!isActive ? "border-b-4 border-orange-500" : ""}`}>
            <h1 className="font-bold text-gray-400 text-lg">Following</h1>
          </div>
        </div>
        <div>
          <div className="flex items-center p-4">
            <Avatar src={Profile} size="40" round={true} />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="outline-none ml-2 w-full border-none px-2 py-1 text-lg"
              placeholder="What's on your mind?"
            />
          </div>
          <div className="p-4 flex text-center justify-between border-b border-gray-300">
            <div>
              <CiImageOn size={30} />
            </div>
            <button
              onClick={submitHandler}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-full w-24"
            >
              Post
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePost;
