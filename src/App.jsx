import { useState, createContext } from 'react'

import RouteHandle from './Config/RouteHandle';

import AuthContextProvider from './Provider/AuthContextProvider';
import axios from 'axios';
import { Provider } from 'react-redux';
axios.defaults.baseURL = "https://electrahaven-samiislam851.vercel.app/";
import store from './app/store'

function App() {



  return (
    <>
      <Provider store={store}>


        <AuthContextProvider>

          <RouteHandle />


        </AuthContextProvider>
      </Provider>
    </>
  )
}

export default App
