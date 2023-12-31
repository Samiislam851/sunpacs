
import React, { createContext, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserMongoData } from "../features/userMongoSlice/userMongoSlice";



export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  console.log(state);
  const { userMongoData, isAdmin, error } = useSelector((state) => state.mongodbUserReducer);
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(false);
  const [userData, setUserData] = useState(false);
  const [adminStateLoading, setAdminStateLoading] = useState(true)
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
  const [dark, setDark] = useState(false);
  // const [userMongoData, setUserMongoData] = useState(null);
  const [cartToggle, setCartToggle] = useState(true);
  const [cart, setCart] = useState([]);
  const [refetchUser, setRefetchUser] = useState(true);





  console.log(userMongoData);




  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    // const localTheme = localStorage.getItem("theme");
    const localTheme = "light";
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);




  useEffect(() => {
    // axios.get(`users/${user?.email}`).then(
    //   res => {
    //     setUserMongoData(res.data)
    //     if (res.data?.role == "admin") {
    //       setIsAdmin(true)
    //       setIsStudent(false)
    //       setAdminStateLoading(false)
    //     }

    //   }
    // )
    console.log('line before dispatch...................................................................llllllll');
    dispatch(getUserMongoData(user?.email))

    console.log('line after dispatch...................................................................llllllll');

  }, [user, refetchUser]);

  ////////////////////////////////////////////////////////cart/////////////////////////////////////////////////

  useEffect(() => {
    if (userMongoData?.role == 'customer') {
      axios.get(`cart/${userMongoData.email}`).then(res => {
        setCart(res.data)
      }
      )

      console.log(userMongoData.email);
    }
  }, [userMongoData, cartToggle]);
  const [productsForHome, setProductsForHome] = useState([]);






  useEffect(() => {
    for (let i = 0; i < 20; i++) {
      axios.get('/products').then(res => {
        setProductsForHome(res.data)
        i = 20;
      })

    }
  }, []);




  const handleToggle = (event) => {
    if (event.target.checked) {
      setTheme("light");
      setDark(false)
    } else {
      setTheme("light");
      setDark(false);
    }
  }

  useEffect(() => {
    if (theme == "dark") {
      setDark(false);
      console.log('setting dark ', dark);
    }
    else {
      setDark(false);
      console.log('setting dark', dark);
    }
  }, [dark]);

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };



  const toastPush = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      setToken(localStorage.getItem('access-token'))
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' +localStorage.getItem('access-token');
    }
    const unSubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
      if (loggedInUser) {
        setIsLogged(true);


        axios.post('/jwt', { email: loggedInUser.email })
          .then(data => {
            setToken(data.data.token)
            localStorage.setItem('access-token', data.data.token)
            // axios.defaults.headers.common['Authorization'] ='Bearer ' +data.data.token;
            setLoading(false);
          })



      } else {
        localStorage.removeItem('access-token')
      }
      setLoading(false)
    });
    return () => {
      unSubscribe();

    };
  }, []);


  const authInfo = { registerUser, cartToggle, setCartToggle, user, logOut, loginUser, isLogged, setIsLogged, toastPush, isAdmin, loading, adminStateLoading, userData, setUserData, setTheme, handleToggle, dark, theme, userMongoData, cart, refetchUser, setRefetchUser, productsForHome };
  return (
    <AuthContext.Provider value={authInfo}>{!loading && children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;