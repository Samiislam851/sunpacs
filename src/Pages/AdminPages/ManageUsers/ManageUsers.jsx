import React, { useEffect, useState, createContext, useContext } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom'
import Spinner from '../../../Component/Spinner/Spinner';
import { AuthContext } from '../../../Provider/AuthContextProvider';

const ManageUsers = ({ setTitle }) => {
  const { registerUser, user, logOut, loginUser, isLogged, setIsLogged, toastPush, userMongoData } = useContext(AuthContext);



  const [loading, setLoading] = useState(true)
  const [renderData, setRenderData] = useState(null);
  const [UsersData, setUsersData] = useState(null)
  const [currentID, setCurrentID] = useState(null)
  const [feedbackdetails, setFeedbackdetails] = useState(null)
  const [feedbackclassid, setfeedbackclassid] = useState(null)
  const [progresssending, setprogresssending] = useState(false)

  useEffect(() => {
    if (loading && user) {
      setTitle("Manage Users")
      axios.get(`/users`)
        .then(response => {
          let data = response.data
          setUsersData(data)
          setRenderData(data)
          setLoading(false)

        })
    }
  }, []);

  const deleteButtonHandler = (id) => {

    axios.delete("/users/delete/" + id)
      .then(response => {
        let data = renderData.filter(e => e._id != id)
      
        setRenderData(data)
        toastPush("Deleted Successfully")
      })
      .catch(err => {
        console.log(err)
      })
  }


  const makeAdminHandler = (e) => {
    const updatedData = renderData.map(obj => {
      if (obj._id === e) {
        return { ...obj, role: "admin",grade : 2 };
      }
      return obj;
    });
  
    setRenderData(updatedData)

    axios.patch(`/users/admin/${e}`).then(response => {
      console.log(response.data)
      toastPush("Role Updated")
    })
  }
  const makeRegularUserHandler = (e) => {
    const updatedData = renderData.map(obj => {
      if (obj._id === e) {
        return { ...obj, role: "customer" };
      }
      return obj;
    });
    console.log(updatedData)
    setRenderData(updatedData)
    axios.patch(`/users/customer/${e}`).then(response => {
      console.log(response.data)
      toastPush("Role Updated")
    })
  }


  return (
    <>

      <div>

        <h1 className='text-6xl font-semibold text-gray-600 text-center my-10'>Manage users</h1>


  

        <>





          {user ?
            <>
              <div></div>

              <section className='flex flex-col items-center justify-center mt-8 space-y-8'>
                <div className="overflow-x-auto  ">


                  <table className="table w-full mb-20">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Grade</th>
                        <th>Admin</th>
                        <th>Demotion</th>
                        <th>Demotion</th>
                      </tr>
                    </thead>
                    <tbody>



                      {loading ? <>
                        <Spinner />
                      </> : <>
                        {renderData.map(e => {

                          return <>
                            <tr>
<td>           <img src={e.photoURL} className='w-[50px] hover:scale-[2.5] hover:translate-x-7 transition-all ease-in-out duration-500 rounded' alt="" /></td>


                              <td className='text-gray-600 '>
                   
                          <h3>     {e.fname} {e.lname}</h3> 
                                </td>
                              <td className='text-gray-600'>
                                {e.email}
                              </td>

                              <td className='text-gray-600'>
                                {e.role}
                              </td>
                              <td className='text-gray-600'>
                                {e.role=="admin"?
                              <>
                              {e.grade&&e.grade}
                              </>:
                              <></>  
                              }
                              </td>



                              <td className='text-gray-600'>
                                <button onClick={() => makeAdminHandler(e._id)} className="btn  btn-xs text-white btn-success" disabled={e.role == 'admin' ? true : false}>Make Admin</button>

                              </td>
                              <td className='text-gray-600'>
                               

                                  {e._id == userMongoData._id?<>
                                  
                                  </>
                                  :
                                  <>

                                  {
                                  e.grade!=1 && 
                                   <button onClick={() => makeRegularUserHandler(e._id)} className="btn  btn-xs text-white  bg-blue-600 border-none" disabled={e.role == 'customer' ? true : false} >Make Regular User</button>
                                   }
                                
                                  </>
                                  
                                  }
                                    
                                  


                              </td>

                              <td> <tr>


                              {e._id == userMongoData._id?<>
                                  
                                  </>
                                  :
                                  <>
                                  {e.grade !=1 &&
                                   <button onClick={() => deleteButtonHandler(e._id)} className="btn  btn-xs text-white  bg-red-600 border-none hover:bg-red-700"   >Delete User</button>
                                  }
                                
                                  </>
                                  
                                  }


                         
                            </tr></td>
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
export default ManageUsers;
