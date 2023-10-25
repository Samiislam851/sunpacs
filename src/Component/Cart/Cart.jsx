import React, { useContext, useEffect, useState } from 'react';
import CartDataCard from '../CartDataCard/CartDataCard';
import { AuthContext } from '../../Provider/AuthContextProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const [toggleDependency, setToggleDependency] = useState(false);
    const [loading,  setLoading] = useState(true);
    const { userMongoData, user, cartToggle, cart, setCartToggle } = useContext(AuthContext);

    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    const updateAddress = () => {
        navigate('/user/address/update');
    }
    

    useEffect(() => {
        const newPrice = cart.reduce((acc, current) => {
            console.log('quantity', current.quantity);
            const productPrice = current.quantity * current.price
            // console.log('current : ', current);
            return acc + productPrice;
        }, 0)
        setTotalPrice(newPrice);


        if (cart[0] && userMongoData?.address) {
            setdisabled(false);
        } else {
            setdisabled(true)
        }


    }, [toggleDependency, cart]);

    const [disabled, setdisabled] = useState(true);







    const handleConfirmOrder = () => {


        const products = []



        const utcDate = new Date();
        utcDate.setHours(utcDate.getHours() + 6);

        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };

        const currentDate = utcDate.toLocaleString('en-US', options)
        console.log('current time........!', currentDate);

        cart.map(data => {
            const product = {
                orderId: data._id,
                productId: data.productId,
                userId:userMongoData._id,
                userEmail:userMongoData.email,
                price: data.price,
                quantity: data.quantity,
                totalPrice: data.price * data.quantity,
                status: "placed",
                orderDate: currentDate,
                shippingAddress: userMongoData.address,
                paymentMethod: "Cash On Delivery",
                paymentStatus: "pending",
            }

            products.push(product);
        })

        console.log('placed order products', products);

        axios.put(`/orders/${userMongoData._id}`, products).then(res => console.log(res.data));

        axios.delete(`cart/${userMongoData.email}`).then(res => {
            console.log(res.data)
            setCartToggle(!cartToggle);

        })





        navigate('/orders',{state:{fromCart : true}})
    }




    return (
        <div className='max-w-[1600px] mx-auto md:px-12 px-5 my-20 h-full '>

            {cart[0] ? <>
                <div className='flex flex-col gap-5 md:flex-row w-full mt-10'>

                    <div className='shadow relative rounded-xl md:mx-10  md:basis-[70%]'>

                        {cart[0] ?
                            <ul>
                                {cart.map(data => <CartDataCard key={data._id} setToggleDependency={setToggleDependency} toggleDependency={toggleDependency} cart={cart} data={data}></CartDataCard>)}
                            </ul>
                            :
                            <></>


                        }



                    </div>


                    <div className=' '>
                        <div className='shadow  rounded-xl'>

                            <div className='  '>
                                {userMongoData?.address ? <>

                                    <div className='p-3 ' >

                                        <div className='border border-[2px]  rounded-lg min-h-20 p-5 '>
                                            <h3 className='text-xl md:text-3xl text-center text-gray-600  pb-5'>Delivery Address</h3>
                                            <h3 className='text-xl font-medium'>{userMongoData.address.fullName} </h3>
                                            <h2 className=' text-gray-600 pb-1 pt-3 '> <span className='font-medium  text-gray-800'> Contact : </span>{userMongoData.address.phone}</h2>

                                            <h2 className=' text-gray-500 py-1 '> <span className='font-medium  text-gray-800'> Address :</span> {userMongoData.address.house} , {userMongoData.address.street} ,{userMongoData.address.subDistrict}, {userMongoData.address.district} {userMongoData.address.division}</h2>
                                            <h2 className=' text-gray-600 py-1 '> <span className='font-medium  text-gray-800'> Postal Code: </span>{userMongoData.address.postalCode}</h2>

                                            <button onClick={updateAddress} className='bg-gray-700 px-4 py-2 text-white rounded-lg font-medium mt-6 mx-auto  transition-all ease-in-out duration-300 hover:shadow-xl '>Update Address</button>
                                        </div>

                                    </div>


                                </> : <>

                                    <button onClick={updateAddress} className='bg-gray-800 px-4 py-2 text-white rounded-lg font-medium mt-6 ms-2 hover:scale-105 transition-all cursor-pointer ease-in-out duration-300 hover:shadow-xl'>Add Address</button>
                                </>}
                            </div>
                            <div className='md:px-10 pt-10 px-5'>
                                <h2 className='text-center flex justify-between text-xl'>Total : <span className='font-semibold'>{totalPrice} bdt</span> </h2>

                                <button onClick={handleConfirmOrder} disabled={disabled} className='bg-orange-500 btn font-medium cursor-pointer hover:bg-[#339675] transition-all ease-in-out duration-500 rounded-lg py-2 px-2 my-5 text-white w-full'>Confirm Order</button>
                            </div>
                        </div>
                    </div>
                </div>

            </> : <>
                <div className='min-h-[70vh] relative'>
                    <h1 className='top-[50%] text-center absolute right-[50%] translate-x-[50%] translate-y-[-50%] text-3xl text-gray-500 '>Your Cart Is Empty :(
                        <br />
                        <div className='text-xl pt-4'>
                        Tips: <span className='text-lg'> Please go to Orders page if you have ordered Something  </span> 
                        </div>
                    </h1>
                </div>


            </>}

            {/* <h1 className='text-3xl text-center'>{userMongoData.name}'s Cart</h1> */}

        </div>
    );
};

export default Cart;