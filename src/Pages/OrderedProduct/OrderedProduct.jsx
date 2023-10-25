import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Navigate, redirect, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContextProvider';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { AiOutlineDownload } from 'react-icons/ai';

const OrderedProduct = () => {
    const params = useParams()
    const id = params.id
    const [product, setProduct] = useState({});
    const { userMongoData } = useContext(AuthContext);
    const navigate = useNavigate()


    const { state } = useLocation();
    console.log('order id.....................', state.order);
    const order = state.order;



    // /////////////// pdg generation ///////////

    const handlePDFDownload = () => {
        axios
            .get(`/orderdetails-pdf/download/${order.orderId}/${order.userEmail}`, {
                responseType: 'blob', // Specify the response type as a blob
            })
            .then((response) => {
                const blob = new Blob([response.data], { type: 'application/pdf' });

                // Create a download link
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'order_details.pdf';

                // Trigger a click event on the link to start the download
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                // Handle any errors
                console.error('Error downloading PDF:', error);
            });
    };

    //////////////////date and time////////////
    const dateTime = new Date(order.orderDate);
    const hour = dateTime.getUTCHours();
    const minute = dateTime.getUTCMinutes();
    const date = dateTime.getUTCDate();
    const year = dateTime.getUTCFullYear();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const amOrPm = hour >= 12 ? "PM" : "AM";
    const monthIndex = dateTime.getUTCMonth();
    const month = monthNames[monthIndex];
    //////////////////////////////////////////////////////

    const handleCancelOrder = () => {


        axios.put(`/orders/cancel/${order.orderId}/${userMongoData._id}`).then(res => {
            console.log(res.data);
            Swal.fire({
                position: 'top-end',
                icon: '',
                title: `${product?.modelNumber}'s order is cancelled`,
                showConfirmButton: false,
                timer: 1500

            });
            navigate('/orders')
        })




    }

    console.log(order);

    useEffect(() => {
        axios.get(`products/${state?.order?.productId}`).then(res => setProduct(res.data))
        window.scrollTo(0, 0);
    }, []);

    const handlePayment = (val) => {


        const data = {

            order,
            product,
            userMongoData
        }
        if (val == 5) {

            navigate(`/payment/mobile-banking/${order.orderId}`, { state: { data } })
        } else {
            navigate(`/payment/card/${order.orderId}`, { state: { data } })
        }

    }



    return (


        <>

            <div className='mx-auto rounded border shadow-lg p-5 rounded-lg my-20 w-[70%]'>

                <div className='bg-gray-100 border flex-col flex justify-center items-center rounded-lg py-5 md:w-[60%] mx-auto'>
                    {/* TO DO : payment gateway Integration */}
                    <div className='text-center font-medium text-gray-600 '>Your order is {order.status}</div>
                    <div className='text-center font-medium text-gray-600 '>And Payment Status : <span className='uppercase'>{order.paymentStatus}</span> </div>

                    {order.paymentStatus == "paid" || order.paymentStatus == "requested" ? <>

                    </> : <>

                        {
                            order.status == "Cancelled" ? <></> : <>

                                <div onClick={() => { handlePayment(5) }} disabled={(userMongoData && product && order) ? false : true} className='btn  text-center text-gray-600 hover:cursor-pointer hover:bg-orange-500 hover:text-white  transition-all ease-in-out duration-500 w-fit  mx-auto rounded p-2 m-2 border border-orange-500'>Proceed to payment using mobile Banking</div>
                                <div onClick={() => { handlePayment(0) }} disabled={(userMongoData && product && order) ? false : true} className='btn  text-center text-gray-600 hover:cursor-pointer hover:bg-orange-500 hover:text-white  transition-all ease-in-out duration-500 w-fit  mx-auto rounded p-2 m-2 border border-orange-500'>Proceed to payment using DBBL Card</div>

                            </>
                        }



                    </>}

                </div>


                <div className=' ease-in-out duration-500 rounded-xl   mx-auto flex flex-col items-center md:flex-row justify-between'>

                    <div className='md:flex gap-3'>
                        <div className='max-w-[200px] md:max-w-[150px] mx-auto'>
                            <img src={product.image} alt="" />
                        </div>
                        <div className='py-3'>
                            <div className='flex flex-col-reverse md:flex-row items-center gap-2'>
                                <div className='flex flex-col items-center border md:border-none py-5 my-1 w-full rounded-lg'>
                                    <h2 className='font-medium md:text-xl text-3xl'>{product.modelNumber}</h2>
                                    <h2 className=' text-gray-600 text-xl md:text-base'>{product.brand}</h2>
                                </div>

                                <div className='bg-gray-200 rounded-lg px-2 text-xs py-1 h-fit w-fit font-medium text-gray-600'>{order.status}</div>

                                <div className='bg-gray-200 rounded-lg px-2 text-xs py-1 h-fit w-fit font-medium text-gray-600'>{order.paymentMethod}</div>

                                <div className='bg-gray-200 rounded-lg px-2 text-xs py-1 h-fit w-fit font-medium text-gray-600'>{order.paymentStatus}</div>

                            </div>


                        </div>
                    </div>


                    <div className='flex flex-col items-center'>

                        <h1 className='text-2xl'>Total Price :  {order.totalPrice} bdt</h1>
                        <h2 className='text-xs text-gray-400'>Quantity : {order.quantity}</h2>
                    </div>

                </div>
                <div className='flex flex-col md:flex-row justify-between items-center'>

                    <h2 className='text-sm text-gray-500 py-4 '> <span className='font-semibold'>Date Of Order Placement :</span> {date} {month} {year},  {hour}:{minute} {amOrPm}</h2>

                    {order.paymentStatus != 'paid' &&order.paymentStatus != 'requested' && <button onClick={handleCancelOrder} className='bg-gray-800 text-xs hover:bg-red-600 transition-all ease-in-out duration-500 text-white py-1 px-2 h-fit w-fit rounded'>Cancel Order</button>}

                </div>
            </div>
            {order.paymentStatus == 'paid'|| order.paymentStatus=='problem found' ?
                <>
                {order.paymentStatus == 'paid'&& <div className='w-[70%] mx-auto flex justify-end'>
                        <button className='btn btn-success bg-cyan-800 text-white ' onClick={handlePDFDownload}>Download <AiOutlineDownload className="inline text-3xl" /></button>


                    </div>}
                   



                    <div >
                        <div className="max-w-[70%] border w-full bg-white p-8 rounded-lg shadow-md transform hover:shadow-xl transition-all duration-300 ease-in-out mx-auto mt-2 mb-10">


                            {/* Order Details */}
                            <h2 className="text-2xl font-semibold capitalize my-4">Order Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-gray-700 font-semibold">Order ID:</div>
                                    <div className="text-gray-500 capitalize">{order.orderId}</div>
                                </div>

                                <div>
                                    <div className="text-gray-700 font-semibold">Order Date:</div>
                                    <div className="text-gray-500 capitalize">{order.orderDate}</div>
                                </div>

                                <div>
                                    <div className="text-gray-700 font-semibold">Payment Date:</div>
                                    <div className="text-gray-500 capitalize">{order.paymentDate}</div>
                                </div>

                                <div>
                                    <div className="text-gray-700 font-semibold">Payment Method:</div>
                                    <div className="text-gray-500 capitalize">{order.paymentMethod}</div>
                                </div>
                                {order.paymentMethod == "card" ?
                                    <div>
                                        <div className="text-gray-700 font-semibold">Payment Service Provider:</div>
                                        <div className="text-gray-500 capitalize">{order.providedBank}</div>
                                    </div>
                                    :
                                    <></>
                                }



                                <div>
                                    <div className="text-gray-700 font-semibold">Payment Status:</div>
                                    <div className="text-gray-500 capitalize">{order.paymentStatus}</div>
                                </div>

                                <div>
                                    <div className="text-gray-700 font-semibold">Quantity:</div>
                                    <div className="text-gray-500 capitalize">{order.quantity}</div>
                                </div>

                                <div>
                                    <div className="text-gray-700 font-semibold">Total Price:</div>
                                    <div className="text-gray-500 capitalize">{order.totalPrice} bdt</div>
                                </div>
                                {order.paymentMethod == 'card' ? <>
                                    <div>
                                        <div className="text-gray-700 font-semibold">Card Number:</div>
                                        <div className="text-gray-500 capitalize">{order.cardNumber}</div>
                                    </div>

                                    <div>
                                        <div className="text-gray-700 font-semibold">Provided Phone Number:</div>
                                        <div className="text-gray-500 capitalize">{order.providedNumber}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-700 font-semibold">Provided Name:</div>
                                        <div className="text-gray-500 capitalize">{order.providedName}</div>
                                    </div>
                                </>
                                    :
                                    <>
                                        <div>
                                            <div className="text-gray-700 font-semibold">Transaction Count:</div>
                                            <div className="text-gray-500 capitalize">{order.transactionCount}</div>
                                        </div>

                                        <div>
                                            <div className="text-gray-700 font-semibold">Transaction Phone Number:</div>
                                            <div className="text-gray-500 capitalize">{order.transactionPhoneNumber}</div>
                                        </div>

                                    </>}


                                <div>
                                    <div className="text-gray-700 font-semibold">User Email:</div>
                                    <div className="text-gray-500 capitalize">{order.userEmail}</div>
                                </div>
                            </div>
                            {/* Product Details */}


                            <h2 className="text-2xl font-semibold capitalize my-4">Product Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                                <div>
                                    <div className="text-gray-700 font-semibold">Model Number:</div>
                                    <div className="text-gray-500 capitalize">{product.modelNumber}</div>
                                </div>

                                <div>
                                    <div className="text-gray-700 font-semibold">Brand:</div>
                                    <div className="text-gray-500 capitalize">{product.brand}</div>
                                </div>

                                <div>
                                    <div className="text-gray-700 font-semibold">Capacity:</div>
                                    <div className="text-gray-500 capitalize">{product.capacity}</div>
                                </div>

                                <div>
                                    <div className="text-gray-700 font-semibold">Type:</div>
                                    <div className="text-gray-500 capitalize">{product.type}</div>
                                </div>
                            </div>
                            {/* Shipping Address */}
                            <h2 className="text-2xl font-semibold capitalize my-4">Shipping Address</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-gray-700 font-semibold">Full Name:</div>
                                    <div className="text-gray-500 capitalize">{order.shippingAddress.fullName}</div>
                                </div>

                                <div>
                                    <div className="text-gray-700 font-semibold">Phone:</div>
                                    <div className="text-gray-500 capitalize">{order.shippingAddress.phone}</div>
                                </div>

                                <div>
                                    <div className="text-gray-700 font-semibold">Division:</div>
                                    <div className="text-gray-500 capitalize">{order.shippingAddress.division}</div>
                                </div>

                                <div>
                                    <div className="text-gray-700 font-semibold">District:</div>
                                    <div className="text-gray-500 capitalize">{order.shippingAddress.district}</div>
                                </div>

                                <div>
                                    <div className="text-gray-700 font-semibold">Sub-District:</div>
                                    <div className="text-gray-500 capitalize">{order.shippingAddress.subDistrict}</div>
                                </div>

                                <div>
                                    <div className="text-gray-700 font-semibold">House:</div>
                                    <div className="text-gray-500 capitalize">{order.shippingAddress.house}</div>
                                </div>

                                <div>
                                    <div className="text-gray-700 font-semibold">Street:</div>
                                    <div className="text-gray-500 capitalize">{order.shippingAddress.street}</div>
                                </div>

                                <div>
                                    <div className="text-gray-700 font-semibold">Postal Code:</div>
                                    <div className="text-gray-500 capitalize">{order.shippingAddress.postalCode}</div>
                                </div>

                                <div>
                                    <div className="text-gray-700 font-semibold">Landmark:</div>
                                    <div className="text-gray-500 capitalize">{order.shippingAddress.landMark}</div>
                                </div>
                            </div>
                            {order.paymentMethod == 'mobileBanking' &&

                                <>
                                    <h2 className="text-2xl font-semibold capitalize my-4">Transaction ID</h2>
                                    <table className="w-full border border-gray-400 rounded-lg">
                                        <thead className="bg-gray-200">
                                            <tr className="hover">
                                                <th className="border border-gray-400 p-2">Transaction ID</th>
                                                <th className="border border-gray-400 p-2">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order?.transactions.map((transaction, index) => (
                                                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                                    <td className="border border-gray-400 p-2">{transaction.transactionId}</td>
                                                    <td className="border border-gray-400 p-2">{transaction.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </>



                            }

{order?.paymentStatus == "problem found" ? <>
                    <div className='flex gap-5 items-center py-5'>
                        <div className="text-gray-500">Feed Back from Admin :</div>
                        <div className="text-gray-500 capitalize border p-5 rounded-lg">{order.feedBack}</div>
                    </div>
                </> : <>


                </>}


                        </div>
                    </div>

                </> : <>


                </>
            }


        </>

    );
}

export default OrderedProduct;
