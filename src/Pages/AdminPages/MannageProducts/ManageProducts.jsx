import React, { useEffect, useState, createContext, useContext } from 'react';

import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../../../Component/Spinner/Spinner';
import { AuthContext } from '../../../Provider/AuthContextProvider';
import Swal from 'sweetalert2';

const ManageProducts = ({ setTitle }) => {
    const { registerUser, user, logOut, loginUser, isLogged, setIsLogged, toastPush } = useContext(AuthContext);

    const [refetch, setRefetch] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [renderData, setRenderData] = useState(null);
    const [myProductsData, setmyProductsData] = useState(null)
    const [currentID, setCurrentID] = useState(null)
    const [feedbackdetails, setFeedbackdetails] = useState(null)
    const [feedbackclassid, setfeedbackclassid] = useState(null)
    const [progresssending, setprogresssending] = useState(false)

const handleNavigate = (id) => {
    navigate(`product/${id}`)
}


    useEffect(() => {
        if (loading && user) {
            setTitle("My Products")
            axios.get(`/products`)
                .then(response => {
                    let data = response.data
                    setmyProductsData(data)
                    setRenderData(data)
                    setLoading(false)

                })
        }
    }, [refetch]);

    const handleProductDelete = (e) => {
        console.log('refetch before >>>>>>>>>>>>>>>>>>', refetch);
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
                axios.delete(`/products/${e._id}`)
                    .then((res) => {
                        console.log(res.data);

                        console.log('refetch after >>>>>>>>>>>>>>>>>>', refetch);
                        Swal.fire(
                            'Deleted!',
                            'This item has been removed from your cart.'

                        )
                        // setRefetch(!refetch);
                        window.location.reload()

                    })
                    .catch((error) => {
                        console.error('Error deleting item:', error);
                    });


            }
        })
    }






    return (
        <>

            <div className='pb-20'>
                <h1 className='text-6xl font-semibold text-gray-600 text-center my-20'>Manage Products</h1>




                <section className='mt-12'>

                </section>

                <>




                    {user ?
                        <>

                            <section className='flex flex-col items-center justify-center mt-8 space-y-8'>
                                <div className="overflow-x-auto  ">


                                    <table className="table w-full">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Listed By</th>

                                                <th>Available Quantity</th>

                                                <th>Update Product Data</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>



                                            {loading ? <>
                                                <Spinner />
                                            </> : <>
                                                {renderData.map(e => {

                                                    return <>
                                                        <tr>

                                                            <td>
                                                                <button onClick={() => handleNavigate(e._id) } >
                                                                    <div className="flex items-center space-x-3">
                                                                        <div className="avatar">
                                                                            <div className="mask mask-squircle w-12 h-12">
                                                                                <img src={e.image} alt="Avatar Tailwind CSS Component" />
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div className="font-bold">{e.modelNumber}</div>
                                                                            <div className="text-sm opacity-50">{e.brand} </div>
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                            </td>

                                                            <td className='text-gray-600'>{e.price}</td>
                                                            <td className='text-gray-600'>{e.AdminEmail}</td>

                                                            <td className='text-center text-gray-600' >

                                                                {e.quantity}


                                                            </td>

                                                            <td>
                                                                <Link to={`/admin/update-product/${e._id}`}>
                                                                    <button className='btn-xs bg-green-500 rounded h-full text-white border-green-500 ' >Update Product</button>
                                                                </Link>

                                                            </td>
                                                            <td>
                                                                <button onClick={() => { handleProductDelete(e) }} className='btn bg-red-600 hover:bg-red-700 text-white btn-xs '>Delete</button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                })}
                                            </>}






                                        </tbody>
                                        {/* foot */}
                                        <tfoot>

                                        </tfoot>

                                    </table>
                                </div>

                            </section>
                        </> : <>

                            <div className='flex justify-center mt-12'>
                                <h1 className='text-4xl font-semibold text-center'>No Content Available. User needs to Sign in</h1>
                            </div>
                        </>



                    }
                </>
            </div>
        </>
    );
}
export default ManageProducts;
