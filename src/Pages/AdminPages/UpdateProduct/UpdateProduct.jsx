import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Swal from 'sweetalert2';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AuthContext } from '../../../Provider/AuthContextProvider';
import Spinner from '../../../Component/Spinner/Spinner';

const UpdateProduct = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);




    const { productId } = useParams();

    console.log(productId);

    const [productData, setProductData] = useState({});
    const [updatedProductData, setUpdatedProductData] = useState({ ...productData });

    console.log('updated product data ', updatedProductData);

    useEffect(() => {
        setLoading(true)
        axios.get(`/products/${productId}`).then(res => {
            setProductData(res.data)
            setUpdatedProductData(res.data)
            console.log(res.data);
            setLoading(false)
        }).catch(err => console.log(err))
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProductData({
            ...updatedProductData,
            [name]: value,
        });
    };

    const handleUpdate = () => {

        console.log('Updated Data:', updatedProductData);
        axios
            .put(`/update-product/${productId}`, updatedProductData)
            .then((response) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${productData?.modelNumber} is updated`,
                    showConfirmButton: false,
                    timer: 2000
                })
         
            })
            .catch((error) => {
                // Handle errors
                console.error('Error updating product:', error);
            });
    };



    return (
        <div>
            <>
                {loading ? <Spinner /> :
                    <div className='max-w-[1600px] md:px-20 mx-auto px-5 py-20 md:pb-40'>

                        <div className='flex'>
                            <div className='basis-[50%]' >
                                <form className='flex-col flex gap-2 '>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <label className='p-2 text-gray-500 text-lg'>Model Number:</label>
                                                </td>
                                                <td>
                                                    <input
                                                        className='rounded-lg p-2 m-2 '
                                                        type="text"
                                                        name="modelNumber"
                                                        value={updatedProductData.modelNumber}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label className='p-2 text-gray-500 text-lg'>Brand:</label>
                                                </td>
                                                <td>
                                                    <input
                                                        className='rounded-lg p-2 m-2 '
                                                        type="text"
                                                        name="brand"
                                                        value={updatedProductName}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label className='p-2 text-gray-500 text-lg'>Type:</label>
                                                </td>
                                                <td>
                                                    <input
                                                        className='rounded-lg p-2 m-2 '
                                                        type="text"
                                                        name="type"
                                                        value={updatedProductData.type}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label className='p-2 text-gray-500 text-lg'>Capacity:</label>
                                                </td>
                                                <td>
                                                    <input
                                                        className='rounded-lg p-2 m-2 '
                                                        type="text"
                                                        name="capacity"
                                                        value={updatedProductData.capacity}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label className='p-2 text-gray-500 text-lg'>Serial:</label>
                                                </td>
                                                <td>
                                                    <input
                                                        className='rounded-lg p-2 m-2 '
                                                        type="text"
                                                        name="serial"
                                                        value={updatedProductData.serial}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                            </tr>


                                            <tr>
                                                <td>
                                                    <label className='p-2 text-gray-500 text-lg'>Price:</label>
                                                </td>
                                                <td>
                                                    <input
                                                        className='rounded-lg p-2 m-2 '
                                                        type="text"
                                                        name="price"
                                                        value={updatedProductData.price}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label className='p-2 text-gray-500 text-lg'>Available Pieces:</label>
                                                </td>
                                                <td>
                                                    <input
                                                        className='rounded-lg p-2 m-2 '
                                                        type="text"
                                                        name="quantity"
                                                        value={updatedProductData.quantity}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <div className='flex justify-center mt-5'>
                                        <button type="button" className='btn bg-cyan-500 hover:bg-cyan-600 text-white mx-auto w-fit' onClick={handleUpdate}>
                                            Update Product
                                        </button>
                                    </div>
                                </form>

                            </div>


                            <div className='basis-[50%] flex flex-col gap-5  justify-center'>


                                <div className=' p-5'>
                                    <h1 className='uppercase text-xl text-center font-medium text-gray-700'>{productData.modelNumber} {productData.type}</h1>
                                    <p className=' text-xl font-medium text-gray-700 text-center pb-10'> <span className='text-gray-400 capitalize'> {productdata.brand} </span> </p>

                                    <div className=' '>
                                        <img src={productData.image} className='max-w-[100px] mx-auto w-full  rounded-lg hover:-translate-y-2 hover:scale-105 transition-all ease-in-out duration-500' alt="" />
                                    </div>

                                    <div className='flex flex-col  gap-3 pt-5 '>


                                        <p className='text-gray-700'> <span className='font-medium text-gray-700'>Approval Number :</span> <span className='text-gray-500 '> {productData.approvalNumber
                                        } </span> </p>
                                        <p className='text-gray-700'> <span className='font-medium text-gray-700'>Date of Approval :</span> <span className='text-gray-500 '> {productData.dateOfApproval
                                        } </span> </p>

                                    </div>
                                    <div className='py-5 flex flex-col md:flex-row gap-2 items-center justify-center md:justify-start'>
                                        <p className='text-lg font-medium text-gray-500  '>Fulfilled Standards:</p>
                                        <ul className='flex gap-3 '>
                                            {
                                                productData.fulfilledStandards.map(data => <li className='bg-gray-200  text-gray-600 border rounded-sm px-2'>{data}</li>)
                                            }
                                        </ul>
                                    </div>





                                </div>

                            </div>
                        </div>

                    </div>}
            </>
        </div>
    );
}

export default UpdateProduct;
