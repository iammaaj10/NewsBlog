import React from 'react';
import Avatar from 'react-avatar';
import Profile from "../assets/profile.jpg";
import { FaRegCommentAlt } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { BLOG_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { toggleRefresh } from '../redux/blogsSlics';
import { MdDelete } from "react-icons/md";

const BlogPost = ({ blogs }) => {
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();

    
    const likedislikehandler = async (id) => {
        try {
            const res = await axios.put(`${BLOG_API_END_POINT}/likes/${id}`, { id: user?._id }, {
                withCredentials: true
            });

            
            dispatch(toggleRefresh());

           
            toast.success(res?.data?.message || "Action completed successfully.");
        } catch (error) {
           
            toast.error(error?.response?.data?.message || "An error occurred while liking/disliking.");
        }
    };


    const deletePostHandler = async (id)=>{
        try {
            axios.defaults.withCredentials=true
        const res = await axios.delete(`${BLOG_API_END_POINT}/delete/${id}`)
        dispatch(toggleRefresh());
        toast.success(res.data.message)
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className='p-2 border-b border-gray-300'>
            <div className='flex gap-2'>
                <Avatar src={Profile} size="40" round={true} />
                <div className='w-full'>
                    <div className='flex items-center gap-2'>
                        <h1 className='font-bold text-lg'>{blogs?.userDetails[0].name}</h1>
                        <p className='text-sm text-md'>{`${blogs?.userDetails[0].username}   . 1m`}</p>
                    </div>
                    <div>
                        <p>{blogs?.description}</p>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-1'>
                            <div className='p-2 hover:bg-green-300 rounded-full pointer-cursor'>
                                <FaRegCommentAlt size={15} />
                            </div>
                            <p>{blogs?.like?.length}</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <div className='p-2 hover:bg-red-300 rounded-full pointer-cursor' onClick={() => likedislikehandler(blogs?._id)}>
                                <AiOutlineLike size={18} />
                            </div>
                            <p>{blogs?.likes?.length}</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <div className='p-2 hover:bg-yellow-300 rounded-full pointer-cursor'>
                                <CiBookmark size={18} />
                            </div>
                            <p>0</p>
                        </div>
                        {user?._id === blogs?.userid && (
                            <div className='flex items-center gap-1'>
                                <div  className='p-2 hover:bg-red-500 rounded-full pointer-cursor' onClick={() => deletePostHandler(blogs?._id)}>
                                    <MdDelete size={18} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
