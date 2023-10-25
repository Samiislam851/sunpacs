import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContextProvider';
import axios from 'axios';
import OrderCard from '../../Component/OrderCard/OrderCard';
import Spinner from '../../Component/Spinner/Spinner';
import { useLocation } from 'react-router-dom';


const Orders = () => {
    const {state} = useLocation();
    console.log('from cart>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',state?.fromCart);



    const { userMongoData } = useContext(AuthContext)
    const [orderData, setOrderData] = useState({});
const [loading, setloading] = useState(true);
   


useEffect(() => {
    const fetchData = () => {
      if (userMongoData?._id) {
        axios.get(`/orders/${userMongoData?._id}`)
          .then((res) => {
            setOrderData(res.data);
            setloading(false);
          })
          .catch((error) => {
            // Handle any errors here
          });
      }
    };
  
    // Fetch data initially
    fetchData();
  
    // Set a timeout to refetch data after 1.5 seconds if state.fromCart is true
    if (state?.fromCart) {
      const refetchTimeout = setTimeout(() => {
        fetchData();
      }, 1500);
  
      // Clear the timeout if the component unmounts
      return () => clearTimeout(refetchTimeout);
    }
  }, [state?.fromCart, userMongoData]);






    return (
        <div className='my-20 relative max-w-[1600px] min-h-[50vh] md:px-40 mx-auto'>
{!loading?<>
    {orderData?.orders?
                <>
                    <h1 className='text-2xl text-gray-600 text-center my-10 max-w-[1600px] mx-auto md:text-5xl'>Your Orders</h1>
                    <div className='px-20'>

                        {
                            orderData?.orders?.map(order => <OrderCard order={order}></OrderCard>)
                        }
                    </div>
                </>
                :
                <h1 className='top-[50%] absolute right-[50%] translate-x-[50%] translate-y-[-50%] text-3xl text-gray-500 '>Your Order list Is Empty :(</h1>


            }
</>:<>
<Spinner/>
</>}
           




        </div>
    );
}

export default Orders;
