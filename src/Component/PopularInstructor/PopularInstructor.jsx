import React, { useEffect, useState, createContext, useContext } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom'
import { AuthContext } from '../../Provider/AuthContextProvider';
import Spinner from '../Spinner/Spinner';
import InstructorCard from '../../Pages/InstructorListPages/InstructorCard';
import { useSpring, animated } from 'react-spring';






const PopularInstructor = () => {
  const { registerUser, user, logOut, loginUser, isLogged, setIsLogged, toastPush, dark } = useContext(AuthContext);

  const [loading, setLoading] = useState(true)
  const [renderData, setRenderData] = useState([]);
  const [UsersData, setUsersData] = useState(null)
  const [currentID, setCurrentID] = useState(null)
  const [feedbackdetails, setFeedbackdetails] = useState(null)
  const [feedbackclassid, setfeedbackclassid] = useState(null)
  const [progresssending, setprogresssending] = useState(false)
  const textLightTheme = 'text-gray-700';
  const textDarkTheme = 'text-gray-200';

  useEffect(() => {
    if (loading) {
      axios.get(`/instructor/all`)
        .then(response => {
          let data = response.data
          setUsersData(data)
          setRenderData(data)
          setLoading(false)

        })
    }
  }, []);



  const [popularClassesData, setPopularClassesData] = useState(true)
  useEffect(() => {
    axios.get("/popularclasses")
      .then(response => {
        setPopularClassesData(response.data)
        setLoading(false)
      })
  }, []);
  const darkText = 'text-gray-700';
  const lightText = 'text-gray-200'

  const [scrollY, setScrollY] = useState(0);

  // Update scrollY on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const percentage = (scrollY / maxScroll) * 100;
      setScrollY(window.scrollY);
      console.log(scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log(scrollY);
  const spring = useSpring({
    from: { opacity: 0, transform: 'translateX(-1500px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    config: { tension: 200, friction: 80 },
    delay: 100,
    reverse: scrollY < 2600,
  });
  const spring2 = useSpring({
    from: { opacity: 0, transform: 'translateX(-1500px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    config: { tension: 180, friction: 90 },
    delay: 100,
    reverse: scrollY < 2600,
  });
  const spring3 = useSpring({
    from: { opacity: 0, transform: 'translateX(-1500px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    config: { tension: 160, friction: 100 },
    delay: 100,
    reverse: scrollY < 2600,
  });

  return (
    <>
      <div className="bg-[#F6F7FA]">
        <div class="mx-auto  pb-24 px-4 md:px-12 pt-1  sm:px-6 lg:max-w-[1600px] ">
          <animated.div style={spring}>
            <p class={`md:text-6xl text-4xl text-center font-semibold  mt-32  pb-7 ${dark ? textDarkTheme : textLightTheme}`}>Popular Instructors </p>
          </animated.div>
          <animated.div style={spring2}>
            <p className='md:w-[50%] w-[90%] mx-auto text-base md:text-lg text-gray-1500 text-center pb-16'>Our renowned team of instructors brings expertise, passion, and a commitment to excellence to every class they lead. Get to know the talented educators behind our popular courses and embark on a learning experience guided by the best in the field.</p>
          </animated.div>
          <animated.div style={spring3}>
            <div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 justify-center align-center ">  {loading ? <>
              <Spinner />
            </> : <>
              {renderData.map((e, index) => {
                return <>
                  {index < 4 && <InstructorCard data={e} />}
                </>
              })}
            </>}

            </div>
          </animated.div>
        </div>
      </div>
    </>
  );
}

export default PopularInstructor;
