import React, { useContext, useState } from 'react';
import Spinner from '../../../Component/Spinner/Spinner';
import { useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Provider/AuthContextProvider';
import { useNavigate } from 'react-router-dom';

const RequestedOrders = () => {
    const [loading, setLoading] = useState(true);
    const [renderedOrders, setRenderedOrders] = useState(null);
    const { user, userMongoData } = useContext(AuthContext)
    useEffect(() => {
        axios.get('/orders/payment-status/requested').then(res => {
            setRenderedOrders(res.data);
            setLoading(false);
        }).catch(err => {
            console.log(err)
         })
    }, []);




    const navigate = useNavigate();


    const handleViewDetails = (e) => {
const fromRequestedPage = true;
        const data = e;
        navigate('/admin/vieworderdetails', { state: { data, fromRequestedPage } })
    }













    return (
        <div>
            {loading ? <><Spinner /></> :
                <>

                    <>





                        {user ?
                            <>
                                {renderedOrders ?
                                    <>
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
                                                            <th>Payment Method</th>
                                                            <th>View and Update Details</th>
                                                           
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
                                                                                e.paymentMethod
                                                                            }




                                                                        </td>

                                                                        <td>
                                                                            <button onClick={() => handleViewDetails(e)} className='btn btn-success btn-xs text-white'>
                                                                                View details
                                                                            </button>

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

                                    </> :
                                    <>
                                        <h1 className='text-3xl text-gray-500 py-32 text-center'>No order with requested payment is available</h1>
                                    </>

                                }


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

export default RequestedOrders;
