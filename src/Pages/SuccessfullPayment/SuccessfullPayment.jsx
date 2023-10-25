import React from 'react';
import { Link } from 'react-router-dom';

const SuccessfullPayment = () => {
    return (
        <div className='min-h-[80vh] flex flex-col'>
            <h1 className="text-center text-3xl text-gray-600 py-20"> Your Payment was successful</h1>
           
            <Link to='/' className='text-center text-white bg-cyan-400 px-2 py-1 rounded-lg  mx-auto border' >Back to home</Link >
            <Link to='/orders' className='text-center text-white my-2 bg-cyan-400 px-2 py-1 rounded-lg  mx-auto border' >Back to Orders page</Link >
        </div>
    );
};

export default SuccessfullPayment;