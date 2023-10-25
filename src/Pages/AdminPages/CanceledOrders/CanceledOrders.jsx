import React, { useContext, useState } from 'react';
import Spinner from '../../../Component/Spinner/Spinner';
import { useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Provider/AuthContextProvider';


const CanceledOrders = () => {
    const [loading, setLoading] = useState(true);
    const [renderedOrders, setRenderedOrders] = useState([]);
    const {user,userMongoData} = useContext(AuthContext)
    useEffect(() => {
        axios.get('/orders/payment-status/cancelled').then(res => {
            setRenderedOrders(res.data);
            setLoading(false);
        }).catch(err => console.log(err))
    }, []);
    return (
        <div>
            {loading ? <><Spinner /></> :
                <>

<>





{user ?
  <>


  {renderedOrders?<>
    <section className='flex flex-col items-center justify-center mt-8 space-y-8'>
      <div className="overflow-x-auto  ">


        <table className="table w-full mb-20">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date and Time</th>
              <th>Price</th>
              <th>Status</th>
              <th>Quantity </th>
              <th>Payment Status</th>
           
            </tr>
          </thead>
          <tbody>



            {loading ? <>
              <Spinner />
            </> : <>
              {renderedOrders.map(e => {

                return <>
                  <tr className='text-gray-500'>


                    <td className='text-gray-500 '>
         
                <h3>     {e.orderId}</h3> 
                      </td>
                    <td className='text-gray-500'>
                      {e.orderDate}
                    </td>

                    <td className='text-gray-500'>
                      {e.totalPrice}
                    </td>
                    <td className='text-gray-500'>
                  {e.status}
                    </td>



                    <td className='text-gray-500'>
                     {e.quantity}

                    </td>
                    <td className='text-gray-500'>
                     

                        {
                        e.paymentStatus
                        }
                          
                        


                    </td>

                    <td>
                 
                         
                    </td>
                   
                  </tr>

                  
                </>
              })}
            </>}


           


          </tbody>
          {/* foot */}
          <tfoot>
           
          </tfoot>

        </table>
      </div>

    </section>
  </>:<>
  
  <h1 className='text-3xl text-gray-500 py-32 text-center'>No order with requested payment is available</h1>
  </>}
  


  </> : <>

    <div className='flex justify-center mt-12'>
      <h1 className='text-4xl font-semibold text-center'>No Content Available. User needs to Sign in</h1>
    </div>
  </>



}
</>

                </>

            }
        </div>
    );
}

export default CanceledOrders;
