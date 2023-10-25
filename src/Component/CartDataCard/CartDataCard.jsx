import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { AuthContext } from '../../Provider/AuthContextProvider';
import Swal from 'sweetalert2'

const CartDataCard = ({ data, toggleDependency, setToggleDependency, cart }) => {

    const [product, setProduct] = useState({});
    const [price, setPrice] = useState(0);
    const { cartToggle, setCartToggle } = useContext(AuthContext)
    const [quantity, setQuantity] = useState(data.quantity);



    const removeItem = (id) => {

        Swal.fire({
            title: 'Are you sure you want to remove this item?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/cart/product/${id}`)
                    .then((res) => {
                        console.log(res.data);
                        // You can update your state or perform any other actions after item removal.
                        setCartToggle(!cartToggle)
                        Swal.fire(
                            'Deleted!',
                            'This item has been removed from your cart.',
                            'success'
                        )


                    })
                    .catch((error) => {
                        console.error('Error deleting item:', error);
                    });


            }
        })







    };

    useEffect(() => {
        if (data.productId) {
            axios.get(`/products/${data?.productId}`).then(
                res => {
                    setProduct(res.data)
                    setPrice(res.data.price)
                }
            )
        }

    }, []);



    const increment = (id) => {



        cart.map(e => {

            if (e.productId == id) {
                e.quantity++;
                setQuantity(e.quantity)
            }
            setToggleDependency(!toggleDependency);
        })



    };
    const decrement = (id) => {
        if (quantity > 1) {
            cart.map(e => {

                if (e.productId == id) {
                    e.quantity--;
                    console.log('Updated quantity in', e.quantity);
                    setQuantity(e.quantity)

                }
                setToggleDependency(!toggleDependency);
                console.log('Updated quantity out', e.quantity);
            })
        }
    };

    return (
        <div>

            <div className='flex items-center gap-6 border-b md:mx-5 py-2 mx-2 '>
                <img src={product.image} className='md:h-[150px] h-[70px]' alt="" />
                <div className='flex items-center justify-between w-full'>
                    <div className=''>
                        <h2 className='md:text-xl text-lg text-gray-700 font-medium pb-1'> {product.brand}</h2>
                        <h3 className='md:text-base text-sm text-gray-600 '> <span className='font-semibold '>Model:</span> {product.modelNumber}</h3>
                        <div className="flex items-center border scale-95 md:scale-100 justify-start ms-0 my-2 w-fit">
                            <button
                                className="border-e text-gray-700 hover:bg-gray-200 transition-all ease-in-out duration-300 hover:text-gray-800  px-3 py-1"
                                onClick={() => decrement(product._id)}
                            >
                                -
                            </button>
                            <span className="mx-3 text-lg text-gray-600 ">{quantity}</span>
                            <button
                                className="border-s text-gray-700 hover:bg-gray-200 transition-all ease-in-out duration-300 hover:text-gray-800  px-3 py-1"
                                onClick={() => increment(product._id)}
                            >
                                +
                            </button>
                        </div>
                    </div>



                    <div className='flex flex-col items-center'>
                        <div className='md:text-2xl text-lg text-gray-500 pb-1 '>{price * quantity} bdt</div>
                        <button onClick={() => { removeItem(data._id) }} className='text-gray-400 hover:text-red-400  text-xs md:text-sm transition-all ease-in-out duration-500 '>Remove <AiOutlineDelete className='inline' /> </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDataCard;