import React from 'react';
import { AiFillFacebook, AiFillHeart, AiFillInstagram, AiFillLinkedin, AiFillTwitterCircle, AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const BlogsCard = ({ data, component }) => {


  return (
    <div className={` w-[100%]  md:hover:shadow-2xl pb-5 image-container rounded-xl transition-all ease-in-out duration-300 mx-auto  bg-transparent `}>
      <div className="relative rounded-lg h-72 w-full overflow-hidden transition-all ease-in-out duration-300">
        <img src={data.image} alt="" className="h-full rounded-lg w-full object-cover object-center transition-all ease-in-out duration-300" />
        <div className=' flex justify-between px-5 items-center gap-5 details w-[100%] pb-8 pt-3 bg-white  absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 transition-all ease-in-out duration-300'>
          <div className=' flex justify-center items-center text-lg text-gray-400 font-semibold gap-1'> <AiFillHeart className='text-red-500 text-xl' /> {data.reactionscount}</div>
          <p className='text-xl  text-gray-500 pt-3 '>Date : <span className='text-[#35B087]'>{data.time}</span></p>
        </div>


      </div>
      {component ? <>
        <Link to={`blogs/blog/${data._id}`} className={`text-xl  md:text-2xl font-semibold  text-gray-600 text-start mt-3 pb-3 font-semibold capitalize md:hover:text-[#35B087] transition-all ease-in-out duration-300`}> <h2 className=' px-5'> {data.title} </h2></Link>
        <p className='px-5 py-2 text-base text-gray-400'>{data.blog_description}</p>
        <Link to={`blogs/blog/${data._id}`} className="mt-0 mb-2 px-5 flex items-center text-[#35B087] text-center font-semibold text-lg float-left md:hover:scale-105 transition-all ease-in-out duration-300">Read More <AiOutlineArrowRight className='inline' /> </Link>
      </> : <>
        <Link to={`blog/${data._id}`} className={`text-xl  md:text-2xl font-semibold  text-gray-600 text-start mt-3 pb-3 font-semibold capitalize md:hover:text-[#35B087] transition-all ease-in-out duration-300`}> <h2 className=' px-5'> {data.title} </h2></Link>
        <p className='px-5 py-2 text-base text-gray-400'>{data.blog_description}</p>
        <Link to={`blog/${data._id}`} className="mt-0 mb-2 px-5 flex items-center text-[#35B087] text-center font-semibold text-lg float-left md:hover:scale-105 transition-all ease-in-out duration-300">Read More <AiOutlineArrowRight className='inline' /> </Link>
      </>}







    </div>
  );
};

export default BlogsCard;