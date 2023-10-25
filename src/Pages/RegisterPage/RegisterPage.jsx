import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthContextProvider';




// ////////////////////// TO DO : post api server e thik e ase .. eikhane jhamela :3 








const RegisterPage = ({ setTitle }) => {
  const [imguploadingmessage, setimguploadingmessage] = useState(null);
  const [progresssending, setProgresssending] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cfPasswordVisible, setCFPasswordVisible] = useState(false);
  const { setUserData } = useContext(AuthContext);

  const changeInputPassword = (e) => {
    setMessage("");
  }

  useEffect(() => {
    setTitle("Registration");
  }, []);

  const auth = getAuth(app);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let phone = e.target.phone.value;
    let password = e.target.password.value;
    let cfpassword = e.target.cfpassword.value;
    let fname = e.target.fname.value;
    let lname = e.target.lname.value;

    if (password === "" || email === "" || phone === "") {
      setMessage("Password, email, and phone can't be empty");
      return;
    } else if (cfpassword !== password) {
      setMessage("Passwords do not match");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setMessage("Missing capital letter in the password");
      return;
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
      setMessage("Missing special character in the password");
      return;
    } else if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setUserData({
      name: fname,
      email: email,
      photoURL: uploadedImageUrl,
    });
    axios.post("/users", {
      fname: fname,
      lname: lname,
      email: email,
      phone: phone,
      photoURL: uploadedImageUrl,
      role: 'customer'
    }).then(res => console.log(res.data)).catch(err => console.log(err))

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      user.updateProfile({
        displayName: fname,
        photoURL: uploadedImageUrl,
      }).then(() => {
        // Profile updated successfully
      }).catch((error) => {
        console.error('Error updating profile:', error);
      });

      console.log('Firebase operation', userCredential);

     
 

    } catch (error) {
      console.log(error);
    }
  }

  const imageUploadHandler = (e) => {
    setimguploadingmessage('Please wait, the image is being uploaded');
    setProgresssending(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload?expiration=0&key=89cd126a18f125ea9e7f8256dcb15acb',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((response) => {
      console.log(response.data);
      setUploadedImageUrl(response.data.data.display_url);
      setimguploadingmessage(null);
      setProgresssending(false);
    }).catch((error) => {
      setimguploadingmessage("Error");
      setProgresssending(false);
      console.log(error);
    });
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  const toggleCFPasswordVisibility = () => {
    setCFPasswordVisible(!cfPasswordVisible);
  }

  return (
    <>
      <section className="w-full flex justify-center items-center px-4 md:px-0 mt-12">
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 text-2xl font-semibold items-center">
            <Link to="/login" className="p-2 rounded-lg border-[2px]  border-[#59c6bb61] py-2 text-gray-500">Login</Link>
            <Link to="/register" className="py-2 p-2 text-white rounded bg-[#59C6BC]">Register Now</Link>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className='flex flex-col md:flex-row gap-5'>
              <input
                type="text"
                name="fname"
                id=""
                placeholder="Enter Your First Name"
                className="p-2 rounded-lg text-black border"
              />
              <input
                type="text"
                name="lname"
                id=""
                placeholder="Enter Your Last Name"
                className="p-2 rounded-lg text-black border"
              />
            </div>
            <input
              type="email"
              name="email"
              id=""
              placeholder="Enter Your Email"
              className="p-2 rounded-lg text-black border"
              required
            />
            <input
              type="phone"
              name="phone"
              id=""
              placeholder="Enter Your Phone Number"
              className="p-2 rounded-lg text-black border"
              required
            />
            <div className="relative ">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Enter Password (1 capital letter, 1 special character, minimum 6 characters)"
                className="p-2 rounded-lg text-black border w-full"
                title='(contain : minimum 1 capital letter, 1 special character, minimum 6 total characters)'
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="right-3 top-3 absolute bottom-[50%]  bg-white "
              >
                {!passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="relative">
              <input
                type={cfPasswordVisible ? 'text' : 'password'}
                name="cfpassword"
                id="cfpassword"
                placeholder="Confirm Password"
                className="p-2 rounded-lg text-black border w-full"
                required
              />
              <button
                type="button"
                onClick={toggleCFPasswordVisibility}
                className="right-3 top-3 absolute bottom-[50%] translate-y-[-0%] "
              >
                {!cfPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className='text-red-700'>{message}</p>
            <div className='grid grid-cols-2'>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text text-gray-400">Upload Your Image</span>
                </label>
                <input type="file" onChange={imageUploadHandler} name='img' id='img' className="file-input file-input-bordered w-full max-w-xs" />
              </div>
              <div className='mt-3'>
                {
                  uploadedImageUrl && <img className='max-w-[300px] rounded-lg m-5' src={uploadedImageUrl} />
                }
              </div>
            </div>
            {imguploadingmessage && <div>
              <p className='text-red-700'>{imguploadingmessage}</p>
            </div>
            }
          
            <button type="submit" className="btn btn-primary text-white text-lg border-0 bg-[#59C6BC] hover-bg-[#3f8c84]">Register</button>
            <a href="#">Forgot Password?</a>
            <a href="#">Already have an account? <Link to="/login" className='text-white'>Login</Link></a>
          </form>
          <div className="grid grid-cols-2 gap-4 text-black text-[10px] md:text-sm">
            {/* <LoginWithFacebook/>
             <LoginWithApple/> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default RegisterPage;
