import React, { useState } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardPayment = () => {
    
    const { state } = useLocation();
    const data = state?.data;
    const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardAccountNumber, setCardAccountNumber] = useState('');
  const [bank, setBank] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!name || !phoneNumber || !cardAccountNumber ||!bank) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    const paymentData = {
      orderId: data.order.orderId,
      user: data.userMongoData,
      name,
      phoneNumber,
      cardAccountNumber,
      bank
    };




    axios.put(`/payment/card/${data.order.orderId}`, paymentData).then(res => {
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

  const handleViewTransactionDetails = () => {
    // This functionality is removed since it's not applicable in this case
  };

  return (
    <div className='max-w-[1600px] mx-auto text-center flex justify-center'>
      <div className='bg-gray-100 rounded-2xl py-10 my-20 mx-10 w-fit mx-auto'>
        <h1 className='text-center text-lg text-gray-500 px-5 py-2'>
          To proceed with the payment, provide the following information <AiOutlineArrowDown className='inline' />
        </h1>
        <div className='space-y-4'>
          <form onSubmit={handleFormSubmit}>
            <table className='text-start text-gray-600 my-7 mx-3 table-auto'>
              <tr>
                <td className='px-5 py-6'>Total Amount :</td>
                <td>{data?.order?.totalPrice}</td>
              </tr>
              <tr>
                <td className='px-5 py-6'>Your Name :</td>
                <td>
                  <input
                    required
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Your Name'
                    className='input input-bordered w-full max-w-xs'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className='px-5 py-6'>Your Phone Number :</td>
                <td>
                  <input
                    required
                    type='text'
                    name='phoneNumber'
                    id='phoneNumber'
                    placeholder='Phone Number'
                    className='input input-bordered w-full max-w-xs'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className='px-5 py-6'>Bank :</td>
                <td>
                  <input
                    required
                    type='text'
                    name='bank'
                    id='bank'
                    placeholder='Bank Name'
                    className='input input-bordered w-full max-w-xs'
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className='px-5 py-6'>Card Account Number :</td>
                <td>
                  <input
                    required
                    type='text'
                    name='cardAccountNumber'
                    id='cardAccountNumber'
                    placeholder='Card Account Number'
                    className='input input-bordered w-full max-w-xs'
                    value={cardAccountNumber}
                    onChange={(e) => setCardAccountNumber(e.target.value)}
                  />
                </td>
              </tr>
            </table>
            <div className='flex'>
              <button
                className='bg-gray-800 hover:shadow hover:bg-gray-900 transition-all ease-in-out duration-300 w-full rounded-lg p-2 text-white mx-5'
                disabled={disabled}
                type='submit'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardPayment;