import React, { useEffect, useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Link } from 'react-router-dom';
// var Carousel = require('react-responsive-carousel').Carousel;

const Slider = ({ children }) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Update scrollPercentage on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const percentage = (scrollY / maxScroll) * 100;
      setScrollPercentage(percentage);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // console.log(scrollPercentage);
  const spring = useSpring({
    from: { opacity: 0, transform: 'translateY(500px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 200, friction: 80 },
    delay: 100,
    reverse: scrollPercentage < 0,
  });
  const spring2 = useSpring({
    from: { opacity: 0, transform: 'translateY(500px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 180, friction: 80 },
    delay: 100,
    reverse: scrollPercentage < 0,
  });
  const spring3 = useSpring({
    from: { opacity: 0, transform: 'translateY(500px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 160, friction: 80 },
    delay: 100,
    reverse: scrollPercentage < 0,
  });
  // const spring = useSpring({
  //   opacity: scrollPercentage > 0 ? 1 : 0, // Fade-in when scrolling past 10% of the page
  //   transform: scrollPercentage > 10 ? 'translateY(0)' : 'translateY(20px)', // Translate Y when scrolling past 10%
  //   config: config.wobbly, // Animation easing function
  //   from: { opacity: 0, transform: 'translateY(20px)' }, // Initial values
  // });

  return (
    <>




      <div className='w-full relative'>
    
        <img src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1458&q=80" className='w-full max-h-[100vh]' />

        <div className=' absolute top-0 left-0 right-0 bottom-0  bg-gray-900   opacity-40'></div>
        <div className='absolute inset-0 flex items-center justify-center md:w-[70%] w-[90%] mx-auto'>
          <div className='flex flex-col items-center justify-center md:gap-10 gap-3'>
            <animated.div style={spring}>
              <p className='md:text-3xl text-xl font-light  text-center z-[10]  text-white'>Welcome to Sunpacs</p>
            </animated.div>
            <animated.div style={spring2}>
              <p className="md:text-6xl text-3xl md:font-bold mb-10 font-semibold text-center z-[10] text-white">
              Your Source for Superior Electrical Solutions.</p>
            </animated.div>
            <animated.div style={spring3}>
              <Link to="/all-products" className='text-white border md:border-[3px] md:text-xl font-medium text-sm w-fit mx-auto rounded-full md:px-10 px-5 md:py-4  py-2 md:hover:bg-[#05A97F] transition-all duration-500 md:hover:border-[#05A97F]'>View All Products</Link></animated.div>
          </div>

        </div>
      
      </div>


    </>
  );
}

export default Slider;
