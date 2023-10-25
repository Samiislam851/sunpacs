import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ViewOrderDetails = () => {

    const { state } = useLocation();
    const [feedBack, setFeedBack] = useState(null);
    const orderData = state.data;
    const fromRequestedPage = state.fromRequestedPage;
    console.log('requested page details', fromRequestedPage);
    const [productData, setProductData] = useState({});
    const navigate = useNavigate();


    const handleProblematicOrder = async () => {

        const { value: formValues } = await Swal.fire({
            title: 'Enter your feedback',
            html:
                `<textarea id="swal-input1"   placeholder='Enter Feedback Here' class="swal2-input">`,
            focusConfirm: false,
            preConfirm: () => {
                return document.getElementById('swal-input1').value

            }
        })
        setFeedBack(formValues)


    }


    const submitWithProblem = () => {
        const newOrderData = { ...orderData, feedBack }

        console.log(newOrderData);

        axios.put(`/problematic-order/admin`, newOrderData).then(res => {

            if (res.data.modifiedCount > 0) {
                console.log(res.data);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Submitted',
                    showConfirmButton: false,
                    timer: 2000
                })

                navigate(`/admin/trackorders`)

            } else if (res.data?.message) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })

            } else {
                console.log(res.data);
            }

        }
        )

    }


    const handleAcknowledgment = () => {
        axios.put(`/paymentReceived/admin`, orderData).then(res => {

            if (res.data.modifiedCount > 0) {
                console.log(res.data);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Updated',
                    showConfirmButton: false,
                    timer: 1500
                })

                navigate(`/admin/trackorders`)

            } else if (res.data?.message) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })

            } else {
                console.log(res.data);
            }

        }
        )
    }

console.log(orderData);

    useEffect(() => {
        axios.get(`/products/${orderData.productId}`).then(res => {
            setProductData(res.data)

        }).catch(err => console.log(err))
    }, []);
    console.log(productData);
    return (
        <div className='flex justify-center mt-10 mb-20'>
            <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-md transform hover:shadow-xl transition-all duration-300 ease-in-out">


                {/* .................... */}
                <h2 className="text-2xl font-semibold capitalize mb-4">Product Details</h2>
                <div className="grid grid-cols-2 gap-4 pb-5">
                    <div className="text-gray-500">Model Number:</div>
                    <div className="font-semibold capitalize">{productData.modelNumber}</div>

                    <div className="text-gray-500">Brand:</div>
                    <div className="font-semibold capitalize">{productdata.brand}</div>

                    <div className="text-gray-500">Capacity:</div>
                    <div className="font-semibold capitalize">{productData.capacity}</div>

                    <div className="text-gray-500">Type:</div>
                    <div className="font-semibold capitalize">{productData.type}</div>
                </div>
                {/*  ........................*/}
                <h2 className="text-2xl font-semibold capitalize mb-4">Order Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-gray-500">Order ID:</div>
                    <div className="font-semibold capitalize">{orderData.orderId}</div>

                    <div className="text-gray-500">Order Date:</div>
                    <div className="font-semibold capitalize">{orderData.orderDate}</div>

                    <div className="text-gray-500">Payment Date:</div>
                    <div className="font-semibold capitalize">{orderData.paymentDate}</div>

                    <div className="text-gray-500">Payment Method:</div>
                    <div className="font-semibold capitalize">{orderData.paymentMethod}</div>
                    {orderData?.paymentServiceProvider && <> <div className="text-gray-500">Payment Service Provider:</div>
                        <div className="font-semibold capitalize">{orderData.paymentServiceProvider}</div>
                    </>}

                    <div className="text-gray-500">Payment Status:</div>
                    <div className="font-semibold capitalize">{orderData.paymentStatus}</div>

                    <div className="text-gray-500">Quantity</div>
                    <div className="font-semibold capitalize">{orderData.quantity}</div>

                    <div className="text-gray-500">Total Price</div>
                    <div className="font-semibold capitalize">${orderData.totalPrice}</div>
                    {orderData.paymentMethod == "mobileBanking" &&
                        <>
                            <div className="text-gray-500">Transaction Count</div>
                            <div className="font-semibold capitalize">{orderData.transactionCount}</div>

                            <div className="text-gray-500">Transaction Phone Number</div>
                            <div className="font-semibold capitalize">{orderData.transactionPhoneNumber}</div>

                        </>
                    }
                    {orderData.paymentMethod == "card" &&
                        <>
                            <div className="text-gray-500">Provided Phone Number </div>
                            <div className="font-semibold capitalize">{orderData.providedNumber}</div>

                            <div className="text-gray-500">Card Number</div>
                            <div className="font-semibold capitalize">{orderData.cardNumber}</div>
                            <div className="text-gray-500">Provided Name</div>
                            <div className="font-semibold capitalize">{orderData.providedName}</div>
                            <div className="text-gray-500">Bank</div>
                            <div className="font-semibold capitalize">{orderData.providedBank}</div>

                        </>
                    }

                    <div className="text-gray-500">User Email:</div>
                    <div className="font-semibold capitalize">{orderData.userEmail}</div>

                    {/* Shipping Address Details */}


                    <h2 className='text-2xl mt-5 mb-2 font-semibold text-gray-700'> Shipping Address</h2><h2></h2>
                    <div className="text-gray-500">Full Name:</div>
                    <div className="font-semibold capitalize">{orderData.shippingAddress.fullName}</div>

                    <div className="text-gray-500">Phone:</div>
                    <div className="font-semibold capitalize">{orderData.shippingAddress.phone}</div>

                    <div className="text-gray-500">Division:</div>
                    <div className="font-semibold capitalize">{orderData.shippingAddress.division}</div>

                    <div className="text-gray-500">District:</div>
                    <div className="font-semibold capitalize">{orderData.shippingAddress.district}</div>

                    <div className="text-gray-500">Sub-District:</div>
                    <div className="font-semibold capitalize">{orderData.shippingAddress.subDistrict}</div>

                    <div className="text-gray-500">House:</div>
                    <div className="font-semibold capitalize">{orderData.shippingAddress.house}</div>

                    <div className="text-gray-500">Street:</div>
                    <div className="font-semibold capitalize">{orderData.shippingAddress.street}</div>

                    <div className="text-gray-500">Postal Code:</div>
                    <div className="font-semibold capitalize">{orderData.shippingAddress.postalCode}</div>

                    <div className="text-gray-500">Landmark:</div>
                    <div className="font-semibold capitalize">{orderData.shippingAddress.landMark}</div>
                </div>

                {orderData.transactions && <>
                    <h2 className='text-2xl mt-5 mb-2 font-semibold text-gray-700'> Transaction Id</h2>
                    <table className="w-full mt-6 border border-gray-400 table rounded-lg">
                        <thead className="bg-gray-200">
                            <tr className="hover">
                                <th className="border border-gray-400 p-2">Transaction ID</th>
                                <th className="border border-gray-400 p-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.transactions.map((transaction, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                    <td className="border border-gray-400 p-2">{transaction.transactionId}</td>
                                    <td className="border border-gray-400 p-2">{transaction.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>

                }
                {orderData?.paymentStatus == "problem found" ? <>
                    <div className='flex gap-5 items-center py-5'>
                        <div className="text-gray-500">Feed Back from Admin :</div>
                        <div className="text-gray-500 capitalize border p-5 rounded-lg">{orderData.feedBack}</div>
                    </div>
                </> : <>


                </>}


                <div className="flex flex-col justify-center items-center gap-5 pt-20">

                    {fromRequestedPage ? <>


                        {feedBack ?
                            <>

                                <div className='border p-5 rounded-xl border-4 text-gray-400'>
                                    <span className='font-bold text-gray-500'>The Feedback : <br /></span>{feedBack}
                                </div>
                                <button onClick={submitWithProblem} className="btn btn-error text-white hover:shadow-lg transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer">
                                    Submit with problem
                                </button>

                            </>
                            :
                            <>
                                <button onClick={handleAcknowledgment} className="btn btn-success text-white hover:shadow-lg transition-all ease-in-out duration-300 hover:scale-105">
                                    Acknowledge as Payment Received
                                </button>
                                <button onClick={handleProblematicOrder} className="btn btn-error text-white hover:shadow-lg transition-all ease-in-out duration-300 hover:scale-105">
                                          There's a problem
                                </button>
                            </>


                        }



                    </> : <></>}

                </div>
            </div>
        </div>
    );
}

export default ViewOrderDetails;
