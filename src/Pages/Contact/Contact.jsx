import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthContextProvider';

const Contact = () => {
  const { dark } = useContext(AuthContext)
  return (
    <div className='max-w-[1600px] mx-auto md:px-12 px-6'>
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center">

        <div className="md:text-center flex flex-col items-center  md:basis-[40%] p-3">
          <h1 className={`${dark ? 'text-gray-200' : 'text-gray-600'} md:text-6xl text-4xl   font-medium md:text-center`}>Contact  Us</h1>

          <button className="px-3 md:ms-3 my-6 text-xl text-[#59C6BC] uppercase rounded-md  font-semibold text-center ">Contact Info</button>

          <h3 className='text-3xl md:text-4xl text-gray-500 font-medium mt-6 my-font text-center'>Our Location</h3>
          <h2 className='text-gray-400  text-lg md:text-xl border-b md:w-[70%] mx-auto text-center pt-3 pb-7'>44 Shirley Ave. West Chicago, IL 60185
          </h2>
          <h3 className='text-3xl md:text-4xl text-gray-500 font-medium pt-10 my-font text-center '>Phone Number</h3>
          <h2 className='text-gray-400  text-lg md:text-xl border-b w-[70%] text-[#E4B422] mx-auto text-center pt-3 pb-7'>+880-194-1XX-XX11
          </h2>
          <h3 className='text-3xl md:text-4xl text-gray-500 font-medium pt-10 my-font text-center '>Email</h3>
          <h2 className='text-gray-400  text-lg md:text-xl  w-[70%] text-[#E4B422] mx-auto text-center pt-3 pb-7'>samisiam851@gmail.com
          </h2>



        </div>
        <div className="md:w-1/2">
          {dark ?
            <img src="https://prenohq.com/wp-content/uploads/2022/08/210325-03-24-7-Support-HD-1.gif" className="img-fluid shadow-sm" alt="" />
            :
            <img src="https://ownmyvps.com/images/contact-us/sales.gif" className="img-fluid w-full shadow-sm" alt="" />
          }

        </div>
      </div>

    </div>
  );
};

export default Contact;