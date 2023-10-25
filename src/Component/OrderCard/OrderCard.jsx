import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ order }) => {
    const [product, setProduct] = useState({});
    console.log(product);

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



    useEffect(() => {
        axios.get(`/products/${order.productId}`).then(res => setProduct(res.data));
        window.scrollTo(0, 0);
    }, []);


    const navigate = useNavigate();

    const handleOrderedProduct = () => {
        navigate(`/orders/product/${product._id}`, { state: { order } });
    }


    return (
        <div onClick={handleOrderedProduct} className='shadow-lg cursor-pointer md:hover:scale-105 transition-all ease-in-out duration-500 rounded-xl border p-5 my-5 md:w-[80%] mx-auto flex flex-col items-center md:flex-row justify-between'>

            <div className='md:flex gap-3'>
                <div className='max-w-[70px] mx-auto'>
                    <img src={product.image} alt="" />
                </div>
                <div className='py-3'>
                    <div className='flex gap-2'>
                        <h2 className='font-medium text-xl'>{product.modelNumber}</h2>
                        <div className='bg-gray-200 rounded-lg px-2 text-xs py-1 font-medium text-gray-600'>{order.status}</div>
                        <div className='bg-gray-200 rounded-lg px-2 text-xs py-1 font-medium text-gray-600'>{order.paymentMethod}</div>
                    </div>
                    <h2 className=' text-gray-600'>{product.brand}</h2>
                    <h2 className='text-sm text-gray-500'> {date} {month} {year},  {hour}:{minute} {amOrPm}</h2>
                </div>
            </div>


            <div>

                <h1 className='text-2xl'> ৳ {order.totalPrice}</h1>
                <h2 className='text-xs text-gray-400'>Quantity : {order.quantity}</h2>
            </div>

        </div>
    );
}

export default OrderCard;
