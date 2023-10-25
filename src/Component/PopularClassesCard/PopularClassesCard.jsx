import React from 'react';
import AuthContextProvider, { AuthContext } from '../../Provider/AuthContextProvider';
import { useContext } from 'react';

const PopularClassesCard = ({data , disablebtn,}) => {
  const {dark,user, toastPush} = useContext(AuthContext);
  const selectClassHandler = (e) => {
    console.log("clicked class handler");
    if (user) {
      let data = {
        classid: e,
        email: user.email,
        enrolled: false
      }
      axios.post("/select/class/", data)
        .then(response => {
          console.log(response.data)
          if (response.data.message == 'exist') {
            toastPush("User Already Select this class")
          } else {
            toastPush("You've Selected Class")
          }

        })
    }else{
      toastPush("Login to select Class")
      navigate("/login")
    }
  }

  return (
      <>
     <div className={` pb-5  ${dark ? ' ' : ' bg-white border-gray-200 rounded hover:shadow-2xl transition-all duration-300'}`}>
        <div className="relative">
          <div className="relative  h-72 w-full overflow-hidden rounded ">
            <div className='w-[100%] h-[100%] bg-black absolute opacity-30 blur '></div>
            
            <img src={data.image} alt="" className="h-full w-full object-cover object-center "/>
           
          </div>
          <div className="relative my-2 mx-4 me-5">
            <p className='text-lg font-semibold text-gray-500'>Seats left  {data.availableseat}</p>
            <p className=" font-medium text-gray-500 border-b border-[#05a9804c] pb-3 mb-2"> Enrolled : {data.enrolledstudents}  </p>
            <p className='text-gray-500 inline float-right'>Price : <span className='text-xl text-[#59C6BC]'>${data.price} </span>   </p>
            <p className="mt-1 text-base font-semibold text-gray-500">Instructor : <span className=' text-[#59C6BC]'> {data.instructorname}</span>  </p>
          </div>
          <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-start overflow-hidden rounded-lg p-4">
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"></div>
            <p className="relative text-3xl font-semibold mb-2 text-gray-400 text-white">{data.classname}</p>
          </div>
        </div>
        <div class="mt-6">
          {/* <a href="#" class="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200">Add to bag<span class="sr-only">, Zip Tote Basket</span></a> */}
          <div className='flex justify-end'>
          <button onClick={() => selectClassHandler(data._id)} className='text-xl text-center w-fit mb-3 me-3 px-5 py-3 rounded-lg hover:bg-[#59C6BC] transition-all duration-300 ease-in-out hover:text-white text-[#59C6BC] font-semibold' disabled={disablebtn}>Select This Class</button>
          </div>
        </div>
      </div>        
      </>
  );
}

export default PopularClassesCard;
