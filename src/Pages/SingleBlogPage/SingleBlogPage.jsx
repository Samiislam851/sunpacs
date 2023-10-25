import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import { BsFillPersonFill } from 'react-icons/bs';
import { Link, Outlet, useParams } from 'react-router-dom';
import { AiFillFacebook, AiFillHeart, AiFillInstagram, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';
import Spinner from '../../Component/Spinner/Spinner';

const SingleBlogPage = ({ setTitle }) => {

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    const { blogId } = useParams();
    const [blogData, setblogData] = useState({});
    useEffect(() => {
        setLoading(true)
        axios.get(`blog/${blogId}`).then(res => {
            setblogData(res.data)
            setTitle(` ${blogData.title}`)
            setLoading(false)
        }).catch(err => console.log(err))
    }, [blogId]);

    useEffect(() => {
        if (loading) {
            axios.get("/blog")
                .then(response => {
                    setBlogs(response.data)
                    setLoading(false);
                   
                }).catch(err => console.log(err))

        }



    }, []);
    console.log(blogs);
    const clickOperation = () => {


    }

    return (
        <>
            {loading ? <Spinner /> :
                <div className='max-w-[1600px] md:px-12 mx-auto px-5 pb-20 md:pb-40'>
                    <div className='py-32'>
                        <h2 className='md:text-6xl text-4xl text-center font-semibold  pb-7 text-gray-700 md:hover:text-[#4da39d] cursor-pointer w-fit mx-auto transition-all ease-in-out duration-300'>{blogData.title}</h2>
                        <p className='txt-center md:text-xl text-gray-400 md:w-[50%] mx-auto  text-center'>{blogData.blog_description}</p>
                    </div>
                    <div className='flex flex-col md:flex-row w-full'>
                        <Outlet />
                        <div className='md:basis-[35%] pt-20 md:pt-0 '>
                            <div class="flex items-center justify-center shadow  px-10 py-5">
                                <input
                                    type="text"
                                    placeholder="Search a blog..."
                                    class="w-64 py-2 px-4 rounded-l-lg border border-gray-300 focus:ring focus:ring-[##55B4AD]transition-all ease-in-out duration-300"
                                />
                                <button
                                    class="bg-[#55B4AD] border border-[#55B4AD] text-white py-2 px-4 rounded-r-lg hover:bg-[#44948f] focus:outline-none focus:ring focus:ring-blue-300 transition-all ease-in-out duration-300"
                                >
                                    Search
                                </button>
                            </div>
                            <div className='shadow mt-16 px-5 md:px-7  '>
                                <h1 className='text-2xl font-medium px-5 pt-5 pb-3 border-b border-[#55B4AD]'>Recent Posts</h1>
                                {
                                    blogs.map(blog => {
                                        if (blog._id === blogData._id) {
                                            return (
                                                <></>
                                            );
                                        } else {
                                            return (
                                                <Link onClick={clickOperation} to={`/blogs/blog/${blog._id}`} className='py-4 px-5 md:text-xl text-lg font-medium border-b block hover:text-[#55B4AD] hover:scale-105 transition-all ease-in-out duration-300 transition-all ease-in-out duration-300'>
                                                    {blog.title}
                                                </Link>
                                            );
                                        }
                                    })
                                }

                            </div>
                            <div className='shadow mt-16 px-5 md:px-7  '>
                                <h1 className='text-2xl font-medium px-5 pt-5 pb-3 border-b border-[#55B4AD]'>Categories</h1>

                                <Link to="#" className='py-4 px-5 md:text-xl text-lg font-medium border-b block hover:text-[#55B4AD] hover:scale-105 transition-all ease-in-out duration-300 transition-all ease-in-out duration-300'>
                                    Class
                                </Link>
                                <Link to="#" className='py-4 px-5 md:text-xl text-lg font-medium border-b block hover:text-[#55B4AD] hover:scale-105 transition-all ease-in-out duration-300 transition-all ease-in-out duration-300'>
                                    Learning
                                </Link>
                                <Link to="#" className='py-4 px-5 md:text-xl text-lg font-medium border-b block hover:text-[#55B4AD] hover:scale-105 transition-all ease-in-out duration-300 transition-all ease-in-out duration-300'>
                                    Study
                                </Link>
                                <Link to="#" className='py-4 px-5 md:text-xl text-lg font-medium border-b block hover:text-[#55B4AD] hover:scale-105 transition-all ease-in-out duration-300 transition-all ease-in-out duration-300'>
                                    Subject
                                </Link>
                                <Link to="#" className='py-4 px-5 md:text-xl text-lg font-medium border-b block hover:text-[#55B4AD] hover:scale-105 transition-all ease-in-out duration-300 transition-all ease-in-out duration-300'>
                                    Timing
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>}
        </>
    );
};

export default SingleBlogPage;