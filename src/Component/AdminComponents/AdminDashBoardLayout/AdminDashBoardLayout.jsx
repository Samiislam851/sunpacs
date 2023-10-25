
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthContextProvider';
import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';



const AdminDashBoardLayout = () => {
  const { registerUser, user, logOut, loginUser, isLogged, setIsLogged, toastPush } = useContext(AuthContext);
  console.log(user);
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
      <div className="font-sans text-gray-900 antialiased">
        <div className="min-h-[100vh] flex bg-gray-200">
          <div className="flex-shrink-0 w-64  bg-cyan-700">
            <Link to="#">
              <div className="flex items-center h-16 px-4 text-xl text-white font-medium">

                <div className="ml-2 hover:scale-110 transition-all ease-in-out duration-300" style={{ paddingTop: 2 }}>
                  Admin Dashboard
                </div>
              </div>
            </Link>
            <div>
              <div className="px-2 py-2">
                <div>{/**/}</div>
              </div>
              <div className="px-6 py-6 text-white hover:scale-125 transition-all ease-in-out duration-300 hover:translate-x-5">
                <Link
                  to="/admin"
                  className="router-link-exact-active router-link-active"
                >
                  Dashboard
                </Link>
              </div>
              {/**/}
              <div className="px-6 py-6 border-t border-gray-700">
                <h4 className="text-sm text-gray-400 uppercase font-bold pb-5 tracking-widest">
                You Can Manage The Things Bellow
                </h4>
                <ul className="mt-3 text-white">
                  <li className="mt-3 hover:scale-110 transition-all ease-in-out duration-300 hover:ps-3">
                    <Link to="/admin/add-product" className=" ">
                      Add a product
                    </Link>
                  </li>
                  <li className="mt-3 hover:scale-110 transition-all ease-in-out duration-300 hover:ps-3">
                    <Link to="/admin/manageproducts" className=" ">
                      Manage Products
                    </Link>
                  </li>
                  <li className="mt-3 hover:scale-110 transition-all ease-in-out duration-300 hover:ps-3">
                    <Link to="/admin/manageusers" className=" ">
                      Manage Users
                    </Link>
                  </li>
                  <li className="mt-3 hover:scale-110 transition-all ease-in-out duration-300 hover:ps-3">
                    <Link to="/admin/trackorders" className=" ">
                     Track Orders
                    </Link>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <div className="flex-grow flex flex-col">
            
            <div className="flex-grow flex flex-col mt-8 px-[1%]">
              <Outlet />

            </div>
          </div>
        </div>
      </div>
      <div className="vue-portal-target" />
      {/**/}
    </>

  );
}

export default AdminDashBoardLayout;

