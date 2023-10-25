import React from 'react';
import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';

const LetsMakeArt = () => {
    return (
        <div className='w-full'>
            {/* <img src="https://melody.ancorathemes.com/wp-content/uploads/2016/05/bg1-Parallax.jpg" alt="" /> */}
            <Parallax
                bgImage="https://images.unsplash.com/photo-1497616987741-7fba8102046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8a2lkJTIwbXVzaWN8ZW58MHwwfDB8fHwy&auto=format&fit=crop&w=500&q=60" // Replace with your image path
                strength={150} // Adjust the parallax effect strength as needed
            >
                <div className="md:py-52 py-20 flex-col flex justify-center items-center">
                    <h1 className="md:text-6xl text-4xl text-center font-semibold md:font-medium text-white">Let's Make Art!</h1>
                    <p className=" text-white text-center  py-10 text-2xl md:w-[50%] w-[90%] mx-auto font-thin">Explore several art forms as your  build creativity and confidence in our new visual arts classes for any age</p>
                    <Link to="#" className='text-gray-800 mx-auto px-10 py-5 text-2xl font-medium rounded-full bg-yellow-400 hover:bg-[#57cfb9dd] hover:text-white transition-all duration-500 scale-75 md:scale-100'>See Our Art Classes</Link>
                </div>
            </Parallax>
        </div>
    );
};

export default LetsMakeArt;