import React, { createContext, useContext } from 'react';

import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import Layout from '../Layout/Layout';
import axios from 'axios';
import LoginPage from '../Pages/LoginPage/LoginPage';
import HomePage from '../Pages/HomePage/HomePage';

import { AuthContext } from '../Provider/AuthContextProvider';
import PrivateRoute from './PrivateRoute';
import RestictedPublicRoute from './RestictedPublicRoute';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';

import RegisterPage from '../Pages/RegisterPage/RegisterPage';
import AddAClass from '../Pages/InstructorPages/AddAClass/AddAClass';
import ManageUsers from '../Pages/AdminPages/ManageUsers/ManageUsers';
import AdminDashBoard from '../Pages/AdminPages/AdminDashBoard/AdminDashBoard';
import AdminDashBoardLayout from '../Component/AdminComponents/AdminDashBoardLayout/AdminDashBoardLayout';
import PaymentClass from '../Pages/StudentPages/PaymentClass/PaymentClass';
import AdminRoute from './AdminRoute';
import DashBoard from '../Pages/DashBoard/DashBoard';
import Test from '../Test';
import Contact from '../Pages/Contact/Contact';
import Cart from '../Component/Cart/Cart';
import User from '../Pages/User/User';
import UpdateAddress from '../Pages/UpdateAddress/UpdateAddress';
import Orders from '../Pages/Orders/Orders';
import OrderedProduct from '../Pages/OrderedProduct/OrderedProduct';
import SingleItem from '../Pages/SingleItem/SingleItem';
import AllProducts from '../Pages/AllProducts/AllProducts';
import ManageProducts from '../Pages/AdminPages/MannageProducts/ManageProducts';
import UpdateProduct from '../Pages/AdminPages/UpdateProduct/UpdateProduct';
import AddAProduct from '../Pages/AdminPages/AddAProduct/AddAProduct';
import SuccessfullPayment from '../Pages/SuccessfullPayment/SuccessfullPayment';
import FailedPayment from '../Pages/FailedPayment/FailedPayment';
import CanceledPayment from '../Pages/CanceledPayment/CanceledPayment';
import MobileBankingPayment from '../Pages/MobileBankingPayment/MobileBankingPayment';
import TrackOrders from '../Pages/AdminPages/TrackOrders/TrackOrders';
import ViewOrderDetails from '../Pages/AdminPages/ViewOrderDetails/ViewOrderDetails';
import CardPayment from '../Pages/CardPayment/CardPayment';


const RouteHandle = () => {
  const { registerUser, user, logOut, loginUser, isLogged, setIsLogged, loading } = useContext(AuthContext);
  const setTitle = (title) => {
    document.title = `Sunpacs | ${title}`
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout setTitle={setTitle} />,
      children: [
        {
          path: "/",
          element: <HomePage setTitle={setTitle} />,
        },
      

      
        // {
        //   path: "/blogs",
        //   element: <BlogPage setTitle={setTitle} />,

        // },
        {
          path: "/contact",
          element: <Contact setTitle={setTitle} />,

        },
        {
          path: "/all-products",
          element: <AllProducts setTitle={setTitle} />,

        },

        // {
        //   path: "/blogs/blog",
        //   element: <SingleBlogPage setTitle={setTitle} />,
        //   children: [
        //     {
        //       path: "/blogs/blog/:blogId",
        //       element: <SingleBlog />
        //     }
        //   ]
        // },
        {
          path: '/cart',
          element : <PrivateRoute> <Cart/> </PrivateRoute> 
        },

       ///////// ////// custom payment for rifat bhai //////////////////
        {
          path: '/payment/mobile-banking/:id',
          element : <PrivateRoute> <MobileBankingPayment/> </PrivateRoute> 
        },
        {
          path: '/payment/card/:id',
          element : <PrivateRoute> <CardPayment/> </PrivateRoute> 
        },
               ///////// ////// custom for rifat bhai end //////////////////
        {
          path: '/payment/success/:transactionId',
          element : <SuccessfullPayment/> 
        },
        {
          path: '/payment/failed/:transactionId',
          element : <FailedPayment/> 
        },
        {
          path: '/payment/cancel/:transactionId',
          element : <CanceledPayment/> 
        },
        
        {
          path: '/product/:productId',
          element :  <SingleItem/> 
        },
        {
          path: '/all-products/product/:productId',
          element :  <SingleItem/> 
        },
        {
          path: '/orders',
          element : <PrivateRoute> <Orders/> </PrivateRoute> 
        },
        {
          path: '/orders/product/:id',
          element : <PrivateRoute> <OrderedProduct/> </PrivateRoute> 
        },


        {
          path: "/login",
          element: <RestictedPublicRoute> <LoginPage setTitle={setTitle} /></RestictedPublicRoute>,
        },
        {
          path: "/register",
          element: <RestictedPublicRoute> <RegisterPage setTitle={setTitle} /></RestictedPublicRoute>,
        },
        {
          path: "/user",
          element: <PrivateRoute> <User setTitle={setTitle} /></PrivateRoute>,
        },
        {
          path: "/user/address/update",
          element: <PrivateRoute> <UpdateAddress setTitle={setTitle} /> </PrivateRoute>,
        },
        {
          path: "/admin/manageproducts/product/:productId",
          element: <SingleItem setTitle={setTitle} />,
        },


        {
          path: "/admin",
          element: <AdminRoute> <AdminDashBoardLayout setTitle={setTitle} /></AdminRoute>,
          children: [
            {
              path: "/admin",
              element: <AdminDashBoard setTitle={setTitle} />,
            },
            {
              path: "/admin/manageproducts",
              element: <ManageProducts setTitle={setTitle} />,
            },
            {
              path: "/admin/trackorders",
              element: <TrackOrders setTitle={setTitle} />,
            },
            {
              path: "/admin/add-product",
              element: <AddAProduct setTitle={setTitle} />,
            },
            {
              path: "/admin/update-product/:productId",
              element: <UpdateProduct />,
            },

            {
              path: "/admin/manageusers",
              element: <ManageUsers setTitle={setTitle} />,
            },
            {
              path: "/admin/vieworderdetails",
              element: <ViewOrderDetails  />,
            },
            

          ]
        }
        ,
      

      
      ]
    },






    , {
      path: "/test",
      element: <Test />
    }
    ,
    {
      path: "*",
      element: <ErrorPage setTitle={setTitle} />,
    }


  ]);


  return (
    <>
      <RouterProvider router={router} />

    </>
  );
}

export default RouteHandle;
