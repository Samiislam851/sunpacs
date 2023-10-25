import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthContextProvider';
import { Fade } from 'react-awesome-reveal';
import Swal from 'sweetalert2';

const AddAProduct = ({ setTitle }) => {
    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState({
        brand: '',
        modelNumber: '',
        capacity: '',
        fulfilledStandards: [],
        approvalNumber: '',
        dateOfApproval: '',
        type: '',
        image: null,
        price: '',
        quantity: '',
        serial: '',
    });
    const [message, setMessage] = useState(null);
    const [imguploadingmessage, setimguploadingmessage] = useState(null);
    const [progresssending, setProgresssending] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [formDisabled, setFormDisabled] = useState(true);
    const { user, toastPush, userMongoData } = useContext(AuthContext);

    useEffect(() => {
        setTitle('Add a Class');
        setLoading(false);
    }, []);

    const formSubmitHandler = async (e) => {
        // setProgresssending(true);
        e.preventDefault();
        const currentDateAndTime = new Date();
        const dataInserted = {
            ...productData,
            image: uploadedImageUrl, AdminName: userMongoData.fname,
            AdminEmail: userMongoData.email,
            currentDateAndTime,
        };

      


        for (let x in productData) {
            console.log('x====', productData[x]);
            function isStringEmpty(str) {
                return str.trim() === '';
            }

            if (isStringEmpty(productData[x]) || productData[x] == '') {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Any field in form can not be left empty, If information not available write : N/A',
                    showConfirmButton: false,
                    timer: 5000
                })

            } else {

                console.log('x>><<>><<>>', productData[x]);

                const inputString = dataInserted.fulfilledStandards;
                const standards = inputString.split(",");
        
                dataInserted.fulfilledStandards = standards;
                console.log('Data to be inserted', dataInserted);

                axios
                .post('/addproduct', dataInserted)
                .then((response) => {
                    setProgresssending(false);
                    toastPush('Product Added Successfully');
                    e.target.reset();
                })
                .catch((err) => {
                    console.log(err);
                    setProgresssending(false);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'product adding failed',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });

            }
        }





      
    };

    const inputChangeHandler = (e) => {



        setProductData({ ...productData, [e.target.id]: e.target.value });
        setMessage(null);



    };

    const imageUploadHandler = (e) => {
        setimguploadingmessage('Wait... Image Is Uploading');
        setProgresssending(true);
        const formData = new FormData();
        const countFile = e.target.files.length;

        for (let i = 0; i < countFile; i++) {
            formData.append('image', e.target.files[i]);

            axios({
                method: 'post',
                url:
                    'https://api.imgbb.com/1/upload?expiration=0&key=89cd126a18f125ea9e7f8256dcb15acb',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            })
                .then((response) => {
                    setUploadedImageUrl(response.data.data.display_url);
                    setimguploadingmessage(null);
                    setProgresssending(false);
                })
                .catch((error) => {
                    setimguploadingmessage('Error');
                    setProgresssending(false);
                });
        }
    };

    return (
        <>
{user ? <>
    <div>
                <h1 className='text-6xl font-semibold text-gray-600 text-center my-10'>
                    Add a Product
                </h1>
                <Fade className='w-full'>
                    <section className='flex flex-col justify-center items-center space-y-5 mt-8 pb-12'>
                        {loading ? (
                            <></>
                        ) : (
                            <form
                                action=''
                                className='w-[90%] md:w-[50%]'
                                onSubmit={formSubmitHandler}
                            >
                                <div className='form-control w-full '>
                                    <label className='label'>
                                        <span className='label-text'>Brand Name</span>
                                    </label>
                                    <input
                                        name='brand'
                                        id='brand'
                                        onChange={inputChangeHandler}
                                        type='text'
                                        placeholder='Brand Name'
                                        className='input input-bordered w-full '
                                    />
                                </div>
                                <div className='form-control w-full '>
                                    <label className='label'>
                                        <span className='label-text'>Model Number</span>
                                    </label>
                                    <input
                                        name='modelNumber'
                                        id='modelNumber'
                                        onChange={inputChangeHandler}
                                        type='text'
                                        placeholder='Model Number'
                                        className='input input-bordered w-full '
                                    />
                                </div>
                                <div className='form-control w-full '>
                                    <label className='label'>
                                        <span className='label-text'>Capacity</span>
                                    </label>
                                    <input
                                        name='capacity'
                                        id='capacity'
                                        onChange={inputChangeHandler}
                                        type='text'
                                        placeholder='Capacity'
                                        className='input input-bordered w-full '
                                    />
                                </div>
                                <div className='form-control w-full '>
                                    <label className='label'>
                                        <span className='label-text'>Fullfilled Standards</span>
                                    </label>
                                    <input
                                        name='fulfilledStandards'
                                        id='fulfilledStandards'
                                        onChange={inputChangeHandler}
                                        type='text'
                                        placeholder='Fullfilled Standards (comma-separated)'
                                        className='input input-bordered w-full '
                                    />
                                </div>
                                <div className='form-control w-full '>
                                    <label className='label'>
                                        <span className='label-text'>Approval Number</span>
                                    </label>
                                    <input
                                        name='approvalNumber'
                                        id='approvalNumber'
                                        onChange={inputChangeHandler}
                                        type='text'
                                        placeholder='Approval Number'
                                        className='input input-bordered w-full '
                                    />
                                </div>
                                <div className='form-control w-full '>
                                    <label className='label'>
                                        <span className='label-text'>Date of Approval</span>
                                    </label>
                                    <input
                                        name='dateOfApproval'
                                        id='dateOfApproval'
                                        onChange={inputChangeHandler}
                                        type='text'
                                        placeholder='Date of Approval'
                                        className='input input-bordered w-full '
                                    />
                                </div>
                                <div className='form-control w-full '>
                                    <label className='label'>
                                        <span className='label-text'>Type</span>
                                    </label>
                                    <input
                                        name='type'
                                        id='type'
                                        onChange={inputChangeHandler}
                                        type='text'
                                        placeholder='Type'
                                        className='input input-bordered w-full '
                                    />
                                </div>
                                <div className='form-control w-full '>
                                    <label className='label'>
                                        <span className='label-text'>Price</span>
                                    </label>
                                    <input
                                        name='price'
                                        id='price'
                                        onChange={inputChangeHandler}
                                        type='text'
                                        placeholder='Price'
                                        className='input input-bordered w-full '
                                    />
                                </div>
                                <div className='form-control w-full '>
                                    <label className='label'>
                                        <span className='label-text'>Serial</span>
                                    </label>
                                    <input
                                        name='serial'
                                        id='serial'
                                        onChange={inputChangeHandler}
                                        type='text'
                                        placeholder='Serial'
                                        className='input input-bordered w-full '
                                    />
                                </div>
                                <div className='form-control w-full '>
                                    <label className='label'>
                                        <span className='label-text'>Quantity</span>
                                    </label>
                                    <input
                                        name='quantity'
                                        id='quantity'
                                        onChange={inputChangeHandler}
                                        type='text'
                                        placeholder='Quantity'
                                        className='input input-bordered w-full '
                                    />
                                </div>
                                <div className='grid grid-cols-2'>
                                    <div className='form-control w-full '>
                                        <label className='label'>
                                            <span className='label-text'>Product Image</span>
                                        </label>
                                        <input
                                            type='file'
                                            onChange={imageUploadHandler}
                                            name='img'
                                            id='img'
                                            className='file-input file-input-bordered w-full max-w-xs'
                                        />
                                    </div>
                                    <div className='mt-3'>
                                        {uploadedImageUrl && <img src={uploadedImageUrl} />}
                                    </div>
                                </div>
                                {imguploadingmessage && (
                                    <div>
                                        <p className='text-red-700'>{imguploadingmessage}</p>
                                    </div>
                                )}

                                <div className='flex justify-center mt-4'>
                                    <button className='btn btn-primary gap-2' disabled={progresssending}>
                                        {progresssending && (
                                            <div class='w-4 h-4 rounded-full animate-spin
                      border-2 border-solid border-white border-t-transparent'></div>
                                        )}

                                        <span>Add Product</span>
                                    </button>
                                </div>
                            </form>
                        )}
                    </section>
                </Fade>
            </div>
</>:<>
<Navigate to='/login'/>


</>}


            
        </>
    );
};

export default AddAProduct;
