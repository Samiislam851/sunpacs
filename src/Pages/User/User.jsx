import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = ({ setTitle }) => {
    const { user, userMongoData } = useContext(AuthContext)

    console.log(userMongoData?.address);

    const navigate = useNavigate();

    const updateAddress = () => {
        navigate('/user/address/update');
    }
    useEffect(() => {
        setTitle("User")
    }, []);


    const [userLevel, setUserLevel] = useState(0);
    useEffect(() => {
        if(userMongoData?.email){
            axios.get(`/user-level/${userMongoData.email}`).then(res => setUserLevel(res.data.userLevel))

        }
     
    }, [userMongoData]);
console.log('userlevel..............................',userLevel);



    return (
        <div className='max-w-[1200px] mx-auto my-20 md:px-12 px-5'>
            <div>

                <div className='flex flex-col items-center justify-center md:flex-row'>

                    <div className='basis-[50%]'>
                        <img className='rounded-lg mx-auto w-full md:max-w-[400px] hover:shadow-2xl transition-all ease-in-out duration-300 hover:scale-105 ' src={userMongoData?.photoURL} alt="" />

                    </div>
                    <div className='basis-[50%] '>
                        <div className='float-left mt-5'>
                            <h1 className='md:text-5xl text-3xl font-medium uppercase'>{userMongoData?.fname} {userMongoData?.lname}</h1>
                            <div>
                                <p className='pt-5  ms-2 text-lg'>Email : <span className='text-gray-500'>{userMongoData?.email}</span> </p>
                                <p className='pt-5  ms-2 text-lg'>Phone : <span className='text-gray-500'>{userMongoData?.phone}</span> </p>
                                <h2 className=' pt-5  ms-2 text-lg text-gray-600  '> <span className='font-medium  text-gray-800'> Level : </span>  {userLevel} </h2>

                            </div>
                        </div>

                    </div>

                </div>

                {userMongoData?.address ? <>

                    <div className='pt-5 md:w-[60%]  ' >
                        <h3 className='text-xl md:text-3xl text-gray-600 pt-20 pb-5'>Delivery Address</h3>
                        <div className='border border-[3px]  rounded-lg min-h-20 p-5 '>
                            <h3 className='text-xl font-medium'>{userMongoData.address.fullName} </h3>
                            <h2 className='text-lg text-gray-600 pb-1 pt-3 '> <span className='font-medium  text-gray-800'> Contact : </span>{userMongoData.address.phone}</h2>

                            <h2 className='text-lg text-gray-500 py-1 '> <span className='font-medium  text-gray-800'> Address :</span> {userMongoData.address.house} , {userMongoData.address.street} ,{userMongoData.address.subDistrict}, {userMongoData.address.district} {userMongoData.address.division}</h2>
                            <h2 className='text-lg text-gray-600 py-1 '> <span className='font-medium  text-gray-800'> Postal Code : </span>{userMongoData.address.postalCode}</h2>



                        </div>

                    </div>
                    <button onClick={updateAddress} className='bg-gray-800 px-4 py-2 text-white rounded-lg font-medium mt-6 ms-2 hover:scale-105 transition-all ease-in-out duration-300 hover:shadow-xl'>Update Address</button>

                </> : <>

                <div className='flex justify-center pt-5'>

                <button onClick={updateAddress} className='bg-gray-800  px-4 py-2 text-white rounded-lg font-medium mt-6 ms-2 hover:scale-105 transition-all cursor-pointer ease-in-out duration-300 hover:shadow-xl'>Add Address</button>
                </div>

                    
                </>}


            </div>
        </div>
    );
}

export default User;
