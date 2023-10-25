import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MobileBankingPayment = () => {

    const { state } = useLocation();
    const data = state.data;
    const navigate = useNavigate();
    const [adminNumber, setAdminNumber] = useState(0);

    useEffect(() => {
        axios.get('/adminNumber').then(res => setAdminNumber(res.data));
        window.scrollTo(0, 0);
    }, []);


    const [phoneNumber, setPhoneNumber] = useState('');
    const [serviceProvider, setServiceProvider] = useState('');
    const [transactionCount, setTransactionCount] = useState(null);
    const [showTransactionInput, setShowTransactionInput] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [transactions, settransactions] = useState([]);


    // Define a function to handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const paymentData = {
            orderId: data.order.orderId,
            paymentServiceProvider: serviceProvider,
            transactionCount,
            transactions,
            phoneNumber,
            user: data.userMongoData
        }
        axios.put(`/payment/mobile-banking/${data.order.orderId}`, paymentData).then(res => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {

                Swal.fire({
                    title: 'Your payment request has been submitted',
                    text: "Kindly monitor this order until our team confirms receipt of payment. Thank you for your attention",
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',

                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/')
                    }
                })




            }else {
                Swal.fire({
                    title: 'There was a problem',
                    text: res.data.message,
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(-1)
                    }
                })
            }
        })

    };

    const handleTransactionInput = async () => {
        if (transactionCount) {
            if (transactions.length < transactionCount) {
                for (let i = 0; i < transactionCount; i++) {


                    const { value: formValues } = await Swal.fire({
                        title: 'Enter TransactionId and Amount',
                        html:
                            `<input id="swal-input1"  placeholder='Enter Transaction ID ${i + 1}' class="swal2-input">` +
                            `<input id="swal-input2" type='number' placeholder='Enter Amount ${i + 1}' class="swal2-input">`,
                        focusConfirm: false,
                        preConfirm: () => {
                            return [
                                document.getElementById('swal-input1').value,
                                document.getElementById('swal-input2').value
                            ]
                        }
                    })


                    const [transactionId, amount] = formValues;
                    // Validate and process the inputs if needed

                    transactions.push({ transactionId, amount }); // Add the transaction details to the array

                }
            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! you might already have given the transaction id. If there is any confusion on entering transactionId and amount. We recommend you to refresh the page and enter everything again to stay on the safe side',

                })
            }
        }



        setDisabled(false)
    }





    const handleViewTransactionDetails = () => {


        const tableData = transactions.map((transaction) => `
    <tr>
        <td class='me-5'>${transaction.transactionId} : </td>
        <td>${transaction.amount}</td>
    </tr>
`).join('')




        const transactionTable = `
    <table class="center-table text-start">
        <tr>
            <th>Transaction ID : </th>
            <th>Amount</th>
        </tr>
        ${tableData}
       
    </table>
`;
        Swal.fire({
            title: 'Transaction Details',
            html: transactionTable,
            icon: 'info',
        });


    }
    const handleServiceProviderChange = (e) => {
        const selectedProvider = e.target.value;
        setServiceProvider(selectedProvider);
        if (selectedProvider === 'custom') {
            setShowTransactionInput(true);
        } else {
            setShowTransactionInput(false);
        }
    };


    return (
        <div className='max-w-[1600px] mx-auto text-center flex justify-center'>
            <div className='bg-gray-100 rounded-2xl py-10 my-20 mx-10 w-fit mx-auto'>
                <div className='text-gray-600 px-5 text-lg'>
                    <span className='text-orange-600 text-lg font-semibold'>Our Merchant Number :</span> <span className='bg-gray-800 m-1  p-1 rounded text-white'>{adminNumber}</span>
                </div>

                <h1 className='text-center text-lg text-gray-500 px-5 py-2'>To proceed the payment give necessary information  bellow <AiOutlineArrowDown className='inline' /></h1>
                <div className='space-y-4 '>


                    <form onSubmit={handleFormSubmit}>
                        <table className='text-start text-gray-600 my-7 mx-3 table-auto'>
                            <tr>
                                <td className='px-5 py-6'>Total Amount : </td>
                                <td>{data?.order?.totalPrice}</td>
                            </tr>
                            <tr>
                                <td className='px-5 py-6'>Your phone : </td>
                                <td>
                                    <input required
                                        type="text"
                                        name='phoneNumber'
                                        id='phoneNumber'
                                        placeholder="Number"
                                        className="input input-bordered w-full max-w-xs"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className='px-5 py-6'>ServiceProvider : </td>
                                <td>
                                    <select
                                        required
                                        className="select w-[80%] md:w-full max-w-xs"
                                        value={serviceProvider} // Set the value here
                                        onChange={handleServiceProviderChange}
                                    >
                                        <option disabled value="">Select your desired service provider</option>
                                        <option value="Bkash">Bkash</option>
                                        <option value="Nagad">Nagad</option>
                                        <option value="Rocket">Rocket</option>

                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className='text-center ps-5 pt-5' colSpan="2">
                                    In how many transactions you want to complete the payment? :
                                </td>
                            </tr>
                            <tr>
                                <td className='text-center ps-5 pt-1 pb-5' colSpan="2">
                                    <input required
                                        type="number"
                                        placeholder="Type here"
                                        className="input input-bordered w-xs"
                                        onChange={(e) => setTransactionCount(e.target.value)}
                                    />
                                </td>
                            </tr>


                        </table>


                        <div className='flex'>
                            <button className=' bg-gray-800 hover:shadow hover:bg-gray-900 transition-all ease-in-out duration-300 w-full rounded-lg p-2 text-white mx-5' disabled={disabled} type="submit ">Submit</button>
                        </div>


                    </form>

                    
                    <div className='flex md:flex-row flex-col justify-center px-3 gap-3 my-5'>
                            <button onClick={handleTransactionInput} className=' border hover:shadow text-gray-600 transition-all ease-in-out duration-300 w-full rounded-lg p-2  md:mx-5' >Enter Transaction details</button>

                            <button onClick={handleViewTransactionDetails} disabled={disabled} className=' border hover:shadow text-gray-600 transition-all ease-in-out duration-300  rounded-lg p-2  md:mx-5 w-full' >View Transaction details</button>

                        </div>
                </div>
            </div>
        </div>
    );
}

export default MobileBankingPayment;
