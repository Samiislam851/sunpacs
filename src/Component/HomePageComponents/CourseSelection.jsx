import React, { useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContextProvider';
import { useContext } from 'react';
import { useSpring, animated } from 'react-spring';

const CourseSection = () => {
  const courses = [
    {
      title: 'Beginner Courses',
      description: 'A comprehensive introduction to the basics of the subject.',
      level: 'Beginner',
    },
    {
      title: 'Intermediate Courses',
      description: 'Build upon your foundational knowledge and expand your skills.',
      level: 'Intermediate',
    },
    {
      title: 'Advanced Courses',
      description: 'Master advanced concepts and tackle complex projects.',
      level: 'Advanced',
    },
  ];

  // for transition on scroll
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;

      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  console.log(scrollY);
  const spring = useSpring({
    from: { opacity: 0, transform: 'translateY(1500px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 300, friction: 80 },
    delay: 100,
    reverse: scrollY < 6200,
  });
  const spring2 = useSpring({
    from: { opacity: 0, transform: 'translateY(500px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 180, friction: 80 },
    delay: 100,
    reverse: scrollY < 6200,
  });
  const spring3 = useSpring({
    from: { opacity: 0, transform: 'translateY(1000px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 160, friction: 100 },
    delay: 100,
    reverse: scrollY < 6200,
  });




  const { dark } = useContext(AuthContext);

  return (
    <animated.div style={spring}>
      <div className=' bg-[#F6F7FA]  mt-10 md:mt-32 pt-1 md:pb-32 pb-16 mb-10'>
        <div className=' max-w-[1600px] md:px-20 px-6 mx-auto'>
          <p className={`md:text-6xl text-4xl text-center font-semibold text-gray-700  mt-32 mb-5 md:mb-10`}>
            Course Levels</p>
          <animated.div style={spring2}>
            <p className='text-gray-400 text-center text-lg md:text-xl mb-20 md:w-[70%] mx-auto w-[95%]'>Discover the world of music through our carefully crafted course levels. Whether you're a complete beginner or an experienced musician looking to refine your skills, our courses offer a path tailored to your journey. </p>
          </animated.div>
          <animated.div style={spring3}>
            <div className={`grid grid-cols-1  md:grid-cols-3 gap-4`}>

              {courses.map((course, index) => (
                <div key={index}>
                  <div className={`bg-white  border-t-[4px] border-b-[4px] border-b-[#59C6BC] border-t-[#59C6BC] px-6 py-10 shadow-md rounded-lg text-center h-full md:w-[90%]  md:hover:shadow-2xl transition-all duration-300 ease-in-out  `}>
                    <p className={`text-3xl text-gray-600 my-3 mb-10 font-semibold`}>{course.title}</p>
                    <p className={`${dark ? 'text-gray-200' : 'text-gray-500'} text-lg  text-gray-400 w-[80%] mx-auto`}>{course.description}</p>
                    <button className="bg-[#59C6BC] hover:bg-[#43c2ba] hover:scale-110 mb-5 hover:rounded-md text-white font-bold py-3 px-6 rounded-lg transition-all ease-in-out duration-300 mt-10">
                      View Courses
                    </button>
                    <p className={`text-lg text-gray-400  mt-4`}>For : {course.level}</p>

                  </div>
                </div>
              ))}
            </div>
          </animated.div>
        </div>
      </div>
    </animated.div >
  );
};

export default CourseSection;
