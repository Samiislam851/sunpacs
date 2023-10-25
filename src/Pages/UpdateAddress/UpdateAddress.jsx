import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthContextProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateAddress = ({ setTitle }) => {

    useEffect(() => {
        setTitle("Update Address")
    }, []);

    const { userMongoData, refetchUser, setRefetchUser } = useContext(AuthContext);

    const existingAddress = userMongoData.address;
    console.log(existingAddress);


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            fullName: e.target.fullName.value,
            phone: e.target.phone.value,
            division: e.target.division.value,
            district: e.target.district.value,
            subDistrict: e.target['sub-district'].value, // Use bracket notation for 'sub-district'
            house: e.target.house.value,
            street: e.target.street.value,
            postalCode: e.target['postal-code'].value, // Use bracket notation for 'postal-code'
            landMark: e.target.landmark.value,
        };


        axios.put(`/user/update-address/${userMongoData._id}`, formData).then(res => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your delivery address has been updated',
                showConfirmButton: false,
                timer: 1500
            });

            e.target.reset();
            setRefetchUser(!refetchUser)

        });

        console.log(formData);
    }





    return (
        <div className='max-w-[1600px]  mx-auto md:px-12 px-4 my-20'>

            <form onSubmit={handleSubmit} className='shadow max-w-[800px] p-10 mx-auto flex flex-col gap-2 rounded-2xl'>
                <h1 className='md:text-4xl text-2xl text-gray-500 text-center font-medium mb-10'>Add Address</h1>
                <label for="fullName" className='font-medium text-gray-500'> Recipient's Full Name :  </label>
                <input type="text" id="fullName" name="fullName" placeholder=" Full Name" className="input input-bordered input-md w-full cursor-text " required />
                <label for="phone" className='font-medium text-gray-500'> Your Contact Number :  </label>
                <input type="tel" name="phone" placeholder="01XXXXXXXXX" className="input input-bordered input-md w-full cursor-text " required />


                <label for="division" className='font-medium text-gray-500'> Division: </label>

                <input type="text" id="division" name="division" placeholder="Division" className="input input-bordered input-md w-full cursor-text " required />

                <label for="district" className='font-medium text-gray-500'>District : </label>

                <input type="text" id="district" name="district" placeholder="District" className="input input-bordered input-md w-full cursor-text " required />

                <label for="sub-district" name="subDistrict" className='font-medium text-gray-500'>Sub District : </label>

                <input type="text" id="sub-district" placeholder="Sub District" className="input input-bordered input-md w-full cursor-text " required />

                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Inside Town?</option>
                    <option>Yes inside the town</option>
                    <option>No, outside of town</option>
                </select>

                <label for="house" className='font-medium text-gray-500'>House/Holding :</label>

                <input type="text" name="house" id="house" placeholder="Type here" className="input input-bordered input-md w-full cursor-text " required />

                <label for="street" className='font-medium text-gray-500'>Street Address :</label>

                <input type="text" id="street" name="street" placeholder="Street Address" className="input input-bordered input-md w-full cursor-text " required />

                <label for="postal-code" className='font-medium text-gray-500'>Postal Code :  </label>

                <input type="text" id="postal-code" name="postalCode" placeholder="Postal Code" className="input input-bordered input-md w-full cursor-text " required />

                <label for="landMark" className='font-medium text-gray-500'>Land Mark </label>

                <textarea id="landmark" name="landMark" placeholder="Land Mark" className="input input-bordered input-md w-full cursor-text " />


                <button type="submit" className='bg-gray-800 text-white font-medium py-2 rounded-lg mt-5 cursor-pointer btn hover:bg-gray-700 w-fit mx-auto hover:scale-105 transition-all ease-in-out duration-500'>Update Address</button>
            </form>

        </div>
    );
};

export default UpdateAddress;