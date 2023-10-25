import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

const LoginPage = ({ setTitle }) => {
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    setTitle("Login");
  }, []);

  const auth = getAuth(app);

  const handleSubmit = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        setMessage("Email or password doesn't match");
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <section className="w-full flex justify-center items-center px-4 md:px-0 mt-12">
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 text-2xl font-semibold items-center">
            <Link to="/login" className="text-white p-2 rounded-lg  bg-[#59C6BC] py-2">
              Login
            </Link>
            <Link to="/register" className="p-2 rounded-lg border-[2px]  border-[#59c6bb61] py-2 text-gray-500">
              Register Now
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col md:min-w-[400px] min-w-[200px] gap-5">
            <input
              type="email"
              name="email"
              id=""
              onChange={() => setMessage("")}
              placeholder="Enter Your Email"
              className="p-2 rounded-lg text-black border w-full"
            />
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                id=""
                onChange={() => setMessage("")}
                placeholder="Enter Password"
                className="p-2 rounded-lg text-black border w-full"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="right-3 top-3 absolute bottom-[50%] translate-y-[-0%] "
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-red-600">{message}</p>
            <button className="btn btn-primary text-lg text-white border-0 bg-[#59C6BC] hover:bg-[#3f8c84]">
              Login
            </button>
            <a href="#">Forgot Password?</a>
            <a href="#">
              If you've no account{' '}
              <Link to="/register" className="text-blue-800">
                Create One
              </Link>
            </a>
          </form>
          <div className="grid grid-cols-2 gap-4 text-black text-[10px] md:text-sm"></div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
