import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContextProvider';
import ActiveLink from '../../Component/ActiveLink/ActiveLink';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BsFillCartFill } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Cart from '../../Component/Cart/Cart';



const Header = () => {



  const [langBtn, setLangBtn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [imgDetails, setImgDetails] = useState(false)
  const { registerUser, logOut, loginUser, isLogged, setIsLogged, isAdmin, isInstructor, loading, user, theme, dark, handleToggle, cartToggle, setCartToggle, userMongoData, cart } = useContext(AuthContext);

  // const { registerUser, user, logOut, loginUser, isLogged, setIsLogged, ,} = useContext(AuthContext);


console.log('user role..................................................................!!!!!!!!!!!!!!!!!!!!!!!!!',userMongoData?.role);






  const [open, setOpen] = React.useState(false);

  const [onHomepage, setOnHomepage] = useState(false);



  const location = useLocation();
  const currentPath = location.pathname;
  console.log('from header .. user : ', user);
  useEffect(() => {
    if (currentPath == '/') {
      setOnHomepage(true)
    } else {
      setOnHomepage(false);
    }

  }, []);




  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* This example requires Tailwind CSS v2.0+ */}
      <div className={`relative ${dark ? 'bg-gray-900' : 'bg-white'} shadow-lg z-[1000]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center   border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <h1 className='h-8 w-auto sm:h-10 text-gray-700 md:text-4xl text-2xl font-semibold flex gap-2 justify-center items-center  themeFont'> SunPacs </h1>

              </a>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <div className='flex '>

                {
                  userMongoData?.role == "customer" ? <>
                    <Link to='/cart'>
                      <div className='w-fit mx-auto text-gray-500  hover:text-gray-700 transition-all ease-in-out duration-500 flex justify-center items-center px-3 py-1 rounded-xl '>
                        <AiOutlineShoppingCart className='text-2xl ' />
                        <div className='text-gray-600 font-semibold ms-[-7px] text-xl px-2'>{cart.length}</div>
                      </div>
                    </Link>
                  </> : <></>

                }

                <button
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setOpen(!open)}
                >
                  <span className="sr-only">Open menu</span>

                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <nav className={`hidden md:flex p-3 px-5 rounded-3xl space-x-10`}>
              <ActiveLink
                to="/"
                className=" font-medium text-gray-500 "
              >
                Home
              </ActiveLink>
              <ActiveLink
                to="/all-products"
                className=" font-medium text-gray-500 "
              >
              Products
              </ActiveLink>

              {
                userMongoData?.role == "customer" ? <>
                  <ActiveLink
                    to="/orders"
                    className="text-base font-medium text-gray-500 "
                  >
                    Orders
                  </ActiveLink>
                </> : <></>

              }
              {
                userMongoData?.role == "customer" ? <>
                  <Link to='/cart' className='-translate-y-'>
                    <div className=' text-gray-500 hover:shadow-xl hover:bg-gray-100 hover:text-gray-700 transition-all ease-in-out duration-500 flex justify-center items-center px-1 py-1 rounded-xl '>
                      <AiOutlineShoppingCart className='text-xl ' />
                      {/* <div className='text-gray-600 font-semibold  px-2'>{cart.length}</div> */}
                    </div>
                  </Link>
                </> : <></>

              }

              <ActiveLink
                to="/contact"
                className="text-base font-medium text-gray-500 "
              >
                Contact
              </ActiveLink>







              {isAdmin ? <ActiveLink
                to={ '/admin'}
                className="text-base font-medium text-gray-500 "
              >
                Dashboard
              </ActiveLink> : <></>}



            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">{!user ?
              <>
                <Link
                  to='/login'
                  className="whitespace-nowrap text-base font-medium text-gray-500 "
                >
                  Sign in
                </Link>
                <Link
                  to='/register'
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r
                  from-[#05A97F] to-[#05A97F] "
                >
                  Sign up
                </Link>
              </>
              :
              <>
                <Link to={`/user`}>
                  <img src={user?.photoURL ? user?.photoURL : userMongoData?.photoURL} className='rounded-full h-[50px] border border-1 shadow border-gray-300 cursor-pointer' title="click to view profile" alt="" />
                </Link>
                <button onClick={logOut} className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-100 bg-red-500 hover:bg-red-600'>Sign Out</button>
              </>}
            </div>
          </div>
        </div>
        {/* ////////////////////////////////////////////////////////////////////////////// */}

        <div
          className={
            open
              ? "opacity-100 scale-100 transition ease-out duration-200 absolute top-0 inset-x-0 p-2 transition transform origin-top-right z-[500] text-center bg-white shadow-2xl border-gray-500  md:hidden"
              : "opacity-0 scale-95 z-[-100] hidden"
          }
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 footer-main divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>

                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="footer-main rounded-md p-2 inline-flex items-center justify-center text-blue-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => setOpen(!open)}
                  >
                    <span className="sr-only">Close menu</span>
                    {/* Heroicon name: outline/x */}
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8 ">

                  {user && <img src={user?.photoURL ? user.photoURL : userMongoData?.photoURL} className='rounded-full mx-auto mb-2 h-[50px] border border-1 shadow border-gray-300' title="click to view profile" alt="" />}


                  <ActiveLink
                    to="/"
                    className="text-base font-medium text-gray-500 "
                  >
                    Home
                  </ActiveLink>

                  <ActiveLink
                    to="/contact"
                    className="text-base font-medium text-gray-500 "
                  >
                    Contact
                  </ActiveLink>

                  {
                    userMongoData?.role == "customer" ? <>
                      <ActiveLink
                        to="/orders"
                        className="text-base font-medium text-gray-500 "
                      >
                        Orders
                      </ActiveLink>
                    </> : <></>

                  }




                  {user ? <ActiveLink
                    to={!loading && (isAdmin ? '/admin' : (isInstructor ? '/instructor' : '/student'))}
                    className="text-base hidden md:visible font-medium text-gray-500 "
                  >
                    Dashboard
                  </ActiveLink> : <></>}





                  <div className=" md:flex items-center justify-end md:flex-1 lg:w-0">{!user ?
                    <>
                      <Link
                        to='/login'
                        className="whitespace-nowrap text-base font-medium text-gray-500 "
                      >
                        Sign in
                      </Link>
                      <Link
                        to='/register'
                        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-500 bg-[#05A97F]"
                      >
                        Sign up
                      </Link>
                    </>
                    :
                    <>

                      <button onClick={logOut} className=' -ms-1 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white  bg-red-500'>Sign Out</button>
                    </>}
                  </div>


                </nav>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
