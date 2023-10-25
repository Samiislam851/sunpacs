import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../Component/Spinner/Spinner';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthContextProvider';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const SingleItem = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { user, setCartToggle, cartToggle, userMongoData } = useContext(AuthContext);
    const navigate = useNavigate();


    const { productId } = useParams();

    console.log(userMongoData?.role);

    const [productData, setProductData] = useState({});

    useEffect(() => {
        setLoading(true)
        axios.get(`/products/${productId}`).then(res => {
            setProductData(res.data)
            console.log(res.data);
            setLoading(false)
        }).catch(err => console.log(err))





    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formattedDate, setFormattedDate] = useState('');
    useEffect(() => {
        if(productData?.currentDateAndTime!=null){

            const date = new Date(productData?.currentDateAndTime);

            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true, // Use 12-hour clock with AM/PM
            };
        
            setFormattedDate(new Intl.DateTimeFormat("en-US", options).format(date));
        }; }, 
        
        [productData?.currentDateAndTime]);

    // const  formattedDate = '2023-10-10T00:00:00.000Z'; 
 



console.log('fullfilled standards ',productData?.fulfilledStandards);




    const addToCart = () => {

        const cart = {
            userEmail: user?.email,
            productId: productId,
            quantity: 1,
            price: productData?.price
        }
        console.log(cart);

        axios.post('cart/', cart).then(res => {
            console.log('acknowledgment....................................', res.data.acknowledged);
            if (res.data.acknowledged) {

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${productData?.modelNumber} was added to your cart`,
                    showConfirmButton: false,
                    timer: 1500
                })
                setCartToggle(!cartToggle);

            } else {

                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: `${productData?.modelNumber} is already in your cart`,
                    showConfirmButton: false,
                    timer: 1500

                })

            }

        })

    }



    return (
        <div>
            <>
                {loading ? <Spinner /> :
                    <div className='max-w-[1600px] md:px-20 mx-auto px-5 py-20 md:pb-40'>
                        <div className='flex gap-5 shadow p-10 justify-center'>

                            <div className='basis-[40%] '>
                                <img src={productData?.image} className='max-w-[500px] mx-auto w-full  hover:-translate-y-2 hover:scale-105 transition-all ease-in-out duration-500' alt="" />
                            </div>
                            <div className='basis-[60%] p-5'>
                                <h1 className='uppercase text-4xl text-center font-medium text-gray-700'>{productData?.modelNumber} {productData?.type}</h1>
                                <p className=' text-xl font-medium text-gray-700 text-center pb-10'> <span className='text-gray-400 capitalize'> {productData?.brand} </span> </p>
                                <div className='flex flex-col  gap-3 pt-5 '>
                                    <p className='text-xl text-gray-800 font-semibold'>Specifications : </p>
                                    <p className='text-gray-700'> <span className='font-medium text-gray-700'>Category :</span> <span className='text-gray-500 capitalize'> {productData?.type} </span> </p>


                                    <p className='text-gray-700'> <span className='font-medium text-gray-700'>Capacity :</span> <span className='text-gray-500 capitalize'> {productData?.capacity} </span> </p>
                                    <p className='text-gray-700'> <span className='font-medium text-gray-700'>Serial :</span> <span className='text-gray-500 '> {productData?.serial} </span> </p>
                                    <p className='text-gray-700'> <span className='font-medium text-gray-700'>Approval Number :</span> <span className='text-gray-500 '> {productData?.approvalNumber
                                    } </span> </p>
                                    <p className='text-gray-700'> <span className='font-medium text-gray-700'>Date of Approval :</span> <span className='text-gray-500 '> {productData?.dateOfApproval
                                    } </span> </p>
                                    <p className='text-gray-700'> <span className='font-medium text-gray-700'>Price :
                                    </span> <span className='text-gray-500 '> {productData?.price} </span> </p>
                                    <p className='text-gray-700'> <span className='font-medium text-gray-700'>Available Pieces :
                                    </span> <span className='text-gray-500 '> {productData?.quantity} </span> </p>

                                    {userMongoData?.role == "admin" ? <>
                                        <p className='text-gray-700'> <span className='font-medium text-gray-700'>By Admin :
                                        </span> <span className='text-gray-500 '> {productData?.AdminName} </span> </p>
                                        <p className='text-gray-700'> <span className='font-medium text-gray-700'>Admin Email :
                                        </span> <span className='text-gray-500 '> {productData?.AdminEmail} </span> </p>
                                        <p className='text-gray-700'> <span className='font-medium text-gray-700'>Listed :
                                        </span> <span className='text-gray-500 '> {formattedDate} </span> </p>


                                    </> :

                                        <>


                                        </>


                                    }

                                </div>
                                <div className='py-5 flex flex-col md:flex-row gap-2 items-center justify-center md:justify-start'>
                                    <p className='text-lg font-medium text-gray-500  '>Fulfilled Standards:</p>
                                    <ul className='flex gap-3 '>
                                        {productData?.fulfilledStandards ? <>
                                            {
                                                productData?.fulfilledStandards.map(data => <li className='bg-gray-200  text-gray-600 border rounded-sm px-2'>{data}</li>)
                                            }
                                        </>
                                            :
                                            <>

                                            </>}

                                    </ul>
                                </div>
                                {userMongoData?.role == "admin" ? <></> :


                                    <>

                                        {user ? <button onClick={() => { addToCart() }} className={` bg-orange-500 flex items-center gap-1 text-white py-1 px-2 rounded hover:shadow-lg hover:scale-105  transition-all ease-in-out`}><AiOutlineShoppingCart className='inline' /> Add to cart</button> :
                                            <button onClick={() => { navigate('/login') }} className={` bg-orange-500 flex items-center gap-1 text-white py-1 px-2 rounded hover:shadow-lg hover:scale-105  transition-all ease-in-out`}><AiOutlineShoppingCart className='inline' /> Add to cart</button>

                                        }

                                    </>}




                            </div>

                        </div>
                    </div>}
            </>
        </div>
    );
}

export default SingleItem;
