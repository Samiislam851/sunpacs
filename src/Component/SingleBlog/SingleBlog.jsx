import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiClock } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { AiFillFacebook, AiFillHeart, AiFillInstagram, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';
import Spinner from '../Spinner/Spinner';

const SingleBlog = () => {
    const [loading, setLoading] = useState(true);
    const { blogId } = useParams();
    const [blogData, setblogData] = useState({});
    useEffect(() => {
        setLoading(true)
        axios.get(`blog/${blogId}`).then(res => {
            setblogData(res.data)

            setLoading(false)
            console.log('Hey Im working just fine');
        }).catch(err => console.log(err))
    }, [blogId]);
    return (<>
        {loading ? <Spinner /> : <div className='md:basis-[65%] '>
            <div className='w-full  justify-start items-center flex'>
                <img src={blogData.image} className='image-full rounded-lg md:min-h-[500px]' alt="" />
            </div>

            <div className='flex gap-5 py-2  '>

                <div className='md:text-lg text-gray-500 flex items-center gap-2'>
                    <FiClock className='inline font-bold text-[#55B4AD]' />
                    {blogData.time}
                </div>
                <div className='md:text-lg text-gray-500 flex items-center gap-2'>
                    <BsFillPersonFill className='inline font-bold text-[#55B4AD]' />
                    {blogData.authorname}
                </div>
                <div className='md:text-lg text-gray-500 flex items-center gap-2'>
                    <AiFillHeart className='inline font-bold text-[#55B4AD]' />
                    {blogData.reactionscount} likes
                </div>
            </div>

            <div className='md:text-4xl text-center md:text-start text-gray-700 font-semibold pt-10 pb-5'>{blogData.title}</div>
            <p className='md:text-xl text-center md:text-start text-gray-500 md:pe-20'>
                {blogData.blog}
            </p>
            <div className='border-s-[4px] my-5 border-[#55B4AD] bg-gray-100 bg-opacity-50 py-10 md:text-2xl px-5 text-gray-500'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus dolorem provident hic quasi culpa porro autem quaerat error ducimus eveniet, velit minus mollitia labore quo impedit earum sapiente pariatur praesentium?
                <div className="text-right mt-3">
                    <p className="text-gray-500 text-2xl pe-10">- Conor' Mc George</p>
                </div>
            </div>
            <div className='flex justify-between items-center pt-6'>
                <button className='btn bg-[#55B4AD] hover:bg-[#4ca19c] text-lg font-medium text-white'>Share</button>
                <div className='flex gap-3'>
                    <AiFillFacebook className='hover:text-[#55B4AD] hover:scale-125 transition-all ease-in-out duration-300 text-3xl text-[#339c82] hover:cursor-pointer' />
                    <AiFillInstagram className='hover:text-[#55B4AD] hover:scale-125 transition-all ease-in-out duration-300 text-3xl text-[#339c82] hover:cursor-pointer' />
                    <AiFillTwitterCircle className='hover:text-[#55B4AD] hover:scale-125 transition-all ease-in-out duration-300 text-3xl text-[#339c82] hover:cursor-pointer' />
                    <AiFillLinkedin className='hover:text-[#55B4AD] hover:scale-125 transition-all ease-in-out duration-300 text-3xl text-[#339c82] hover:cursor-pointer' />
                </div>
            </div>
        </div>}


    </>
    );
};

export default SingleBlog;