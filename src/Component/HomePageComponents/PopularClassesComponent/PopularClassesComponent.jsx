import React, { useEffect, useState } from 'react';
import PopularClassesCard from '../../PopularClassesCard/PopularClassesCard';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';

import { AuthContext } from '../../../Provider/AuthContextProvider';
import { useContext } from 'react';
import { useSpring , animated } from 'react-spring';


const PopularClassesComponent = () => {
  const [loading, setLoading] = useState(true)
  const {dark} = useContext(AuthContext);
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
    from: { opacity: 0, transform: 'translateY(500px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 200, friction: 80 },
    delay: 100,
    reverse: scrollY < 500,
  });
  const spring2 = useSpring({
    from: { opacity: 0, transform: 'translateY(500px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 180, friction: 80 },
    delay: 100,
    reverse: scrollY < 500,
  });
  const spring3 = useSpring({
    from: { opacity: 0, transform: 'translateY(500px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 160, friction: 80 },
    delay: 100,
    reverse: scrollY < 500,
  });

// select class handler
const selectClassHandler = (e) => {
  if (user) {
    let data = {
      classid: e,
      email: user.email,
      enrolled: false
    }
    axios.post("/select/class/", data)
      .then(response => {
        console.log(response.data)
        if (response.data.message == 'exist') {
          toastPush("User Already Select this class")
        } else {
          toastPush("You've Selected Class")
        }

      })
  }else{
    toastPush("Login to select Class")
    navigate("/login")
  }
}


  return (
    <>
     <animated.div style={spring}>
      <div class="bg-[#F6F7FA] md:pb-20">
        <div class="mx-auto md:max-w-[1600px]  py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
         
          <p className={`${dark?lightText:darkText} md:text-6xl text-4xl text-center  font-semibold text-gray-800 mt-20 mb-7`}>Our Popular Classes</p>
         
          <animated.div style={spring2}>
          <p className='md:w-[50%] w-[90%] md:text-lg text-gray-500 mx-auto text-center mb-16'>Join us to discover the most sought-after courses that cater to all skill levels. Dive into a world of creativity and knowledge as you embark on your learning journey with our popular classes.</p>
          </animated.div>
          <animated.div style={spring3}>
          <div class="mt-8 grid grid-cols-1  sm:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-x-6">
            {loading ? <>
              <Spinner />
            </> : <>
              {popularClassesData.map(e => {
                return <>
                  <PopularClassesCard data={e} selectClassHandler={selectClassHandler}/>
                </>
              })}
            </>}





          </div>
          </animated.div>
        </div>
      </div>
      </animated.div>
    </>
  );
}

export default PopularClassesComponent;
