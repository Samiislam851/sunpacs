import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AiFillFacebook, AiFillHeart, AiFillInstagram, AiFillLinkedin, AiFillTwitterCircle, AiOutlineArrowRight, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthContextProvider';
import Swal from 'sweetalert2'

const InverterCard = ({ data }) => {
    const  component = true;
    const [disableButton, setDisableButton] = useState(false);
    const navigate = useNavigate();

    const { user, cartToggle, setCartToggle, userMongoData } = useContext(AuthContext);


    const addToCart = () => {

        console.log("..............................................................................", data);
        const cart = {
            userEmail: user?.email,
            productId: data._id,
            quantity: 1,
            price: data.price
        }


        axios.post('cart/', cart).then(res => {
            console.log(res.data);
            if (res.data.acknowledged) {
                setCartToggle(!cartToggle);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${data?.modelNumber} was added to your cart`,
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
    
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: `${data?.modelNumber} is already in your cart`,
                    showConfirmButton: false,
                    timer: 1500

                })

            }

        })

    }

    return (
        <div className={` w-[100%]    md:hover:shadow-2xl pb-5 border bg-white rounded-xl transition-all ease-in-out duration-300 mx-auto  bg-transparent `}>
            <div className="relative rounded-lg h-72 w-full overflow-hidden transition-all ease-in-out duration-300">
                <img src={data.image} alt="" className="rounded-lg w-auto h-[90%] mx-auto object-cover object-center transition-all ease-in-out duration-300" />
                {/* <img src={data.image} alt="" className="h-full rounded-lg w-full object-cover object-center transition-all ease-in-out duration-300" /> */}
              


            </div>
            {component ? <>
                <Link to={`product/${data._id}`} className={`text-xl text-start start md:text-xl font-semibold  text-gray-600  mt-3 pb-3 font-semibold capitalize md:hover:text-[#35B087] transition-all ease-in-out duration-300`}> <h2 className=' px-5'> {data.modelNumber} </h2></Link>
                <p className='px-5 py-1 text-base  md:text-lg text-gray-400'>Brand : {data.brand}</p>
                <p className='px-5 pb-2  text-gray-400'>Type : {data.type}</p>
                <div className=' flex text-start justify-between px-5 pb-2  text-gray-400 gap-1'>

                    
                    <p>Capacity : {data.capacity}</p>

                    <div> price : {data.price}$usd</div>
                </div>



                <div className='flex justify-between items-center px-5 pb-2'>

                    <Link to={`product/${data._id}`} className="mt-0 mb-2  flex items-center text-orange-500 hover:text-[#339675]  text-center font-semibold float-left md:hover:scale-105 transition-all ease-in-out duration-300">Read More <AiOutlineArrowRight className='inline' /> </Link>


                    {userMongoData?.role == "admin" ? <></> :<>
                    
                    { user ? 
                    
                    <button onClick={ addToCart } className={` bg-orange-500 hover:bg-[#339675]  flex items-center gap-1 text-white py-1 px-2 rounded hover:shadow-lg hover:scale-105  transition-all ease-in-out`}><AiOutlineShoppingCart className='inline' /> Add to cart</button>
                    
                    :
                        <button onClick={() => { navigate('/login') }} className={` bg-orange-500 hover:bg-[#339675]  flex items-center gap-1 text-white py-1 px-2 rounded hover:shadow-lg hover:scale-105  transition-all ease-in-out`}><AiOutlineShoppingCart className='inline' /> Add to cart</button>

                    }
                    </>}

                   
                </div>
            </> : <>
               

            </>}







        </div>
    );
};

export default InverterCard;