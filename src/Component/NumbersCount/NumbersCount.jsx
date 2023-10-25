import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const NumbersCount = () => {
    const [startCountUp, setStartCountUp] = useState(false);

    const handleScroll = () => {
        const scrollThreshold = 5500;

        if (window.scrollY >= scrollThreshold) {
            setStartCountUp(true);
            window.removeEventListener('scroll', handleScroll);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className=' py-10'>
            <div className='max-w-[1600px] md:px-12 px-10 mx-auto'>
                <h1 className='md:text-6xl font-semibold text-4xl text-center pb-5 md:pb-10 text-gray-700'>
                    Sunpacs Music School
                </h1>
                <p className='text-center md:text-lg md:w-[70%] mx-auto w-[90%] text-gray-500 pb-10 md:pb-20'>
                Our accomplished instructors are dedicated to fostering musical talents. With expertise in piano, violin, guitar, cello, and more, they impart not just technical skills, but also a deep appreciation for the artistry and emotional power of music. Join us to embark on a limitless musical journey
                </p>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-10'>
                    <div>
                        <div className='flex flex-col items-center md:gap-5 gap-2'>
                            <div className='border rounded-full p-3 bg-gray-100 bg-opacity-20  border-[3px]'>
                            {startCountUp && (
                                <h1 className='md:text-6xl relative text-4xl font-semibold  border border-[4px] border-green-300  rounded-full w-fit md:px-20 px-12 py-12 md:py-20 text-gray-600 bg-white'>
                                    <CountUp end={732} className='my-font absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] ' duration={3} />
                                </h1>
                            )}</div>
                            <h2 className='md:text-3xl text-xl text-gray-600 font-semibold'>Students</h2>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col items-center md:gap-5 gap-2'>
                            <div className='border rounded-full p-3 bg-gray-100 bg-opacity-20  border-[3px]'>
                            {startCountUp && (
                                <h1 className='md:text-6xl relative text-4xl font-semibold  border border-[4px] border-green-300  rounded-full w-fit md:px-20 px-12 py-12 md:py-20 text-gray-600 bg-white'>
                                    <CountUp end={53} className='my-font absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] ' duration={3} />
                                </h1>
                            )}</div>
                            <h2 className='md:text-3xl text-xl text-gray-600 font-semibold'>Teachers</h2>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col items-center md:gap-5 gap-2'>
                            <div className='border rounded-full p-3 bg-gray-100 bg-opacity-20  border-[3px]'>
                            {startCountUp && (
                                <h1 className='md:text-6xl relative text-4xl font-semibold  border border-[4px] border-green-300  rounded-full w-fit md:px-20 px-12 py-12 md:py-20 text-gray-600 bg-white'>
                                    <CountUp end={31} className='my-font absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] ' duration={3} />
                                </h1>
                            )}</div>
                            <h2 className='md:text-3xl text-xl text-gray-600 font-semibold'>Programmes</h2>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col items-center md:gap-5 gap-2'>
                            <div className='border rounded-full p-3 bg-gray-100 bg-opacity-20  border-[3px]'>
                            {startCountUp && (
                                <h1 className='md:text-6xl relative text-4xl font-semibold  border border-[4px] border-green-300  rounded-full w-fit md:px-20 px-12 py-12 md:py-20 text-gray-600 bg-white'>
                                    <CountUp end={23} className='my-font absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] ' duration={3} />
                                </h1>
                            )}</div>
                            <h2 className='md:text-3xl text-xl text-gray-600 font-semibold'>Awards</h2>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default NumbersCount;
