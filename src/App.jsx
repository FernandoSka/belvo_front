import { BrowserRouter, Routes, Route } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';
import Login from './home/Login';
import Navbar from './general/Navbar';
import Register from './home/Register';
import Home from './dashboard/Home';
import BankDetail from "./dashboard/BankDetail/BankDetail";
import AccountDetail from './dashboard/BankDetail/AccountDetail';
import AccountList from './dashboard/BankDetail/AccountList';
import RequireAuth from './auth_system/PrivateRoute';
import { useEffect, useState } from 'react';
import authService from './auth_system/auth';


function App() {
  const [user_name, setUserName] = useState(null)
  const [first_call, setFirstCall] = useState(false)
  const [second_call, setSecondCall] = useState(false)

  useEffect(() => {
    if (authService.isAuthenticated()) {
      const get_user_data = async () => {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/dashboard/user", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authService.getToken()
          }
        }).then((response) => {
          if (response.ok) {

            return response.json();
          }
          if (response.status === 401) {
            authService.refreshToken()
          }
          return Promise.reject(response);
        }).then(result => {
          setUserName(result.name)
        })
      }
      if( user_name===null){
          get_user_data()
      }

    }
    setUserName(user_name)
  })

  const REACT_APP_BELVO_API = process.env.REACT_APP_BELVO_API;
  const REACT_APP_BELVO_SECRET_ID = process.env.REACT_APP_BELVO_SECRET_ID;
  const REACT_APP_BELVO_SECRET_PASSWORD = process.env.REACT_APP_BELVO_SECRET_PASSWORD;
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' exact Component={
            () => <RequireAuth> <Home user_name={user_name} BELVO_URL={REACT_APP_BELVO_API} BELVO_ID={REACT_APP_BELVO_SECRET_ID} BELVO_PASS={REACT_APP_BELVO_SECRET_PASSWORD} /></RequireAuth>
          } />
          <Route path='/Login' Component={() => <Login />} />
          <Route path='/register' Component={() => <Register />} />
          <Route path="/bank_detail/:id" Component={
            (props) => <RequireAuth> <BankDetail {...props} BELVO_URL={REACT_APP_BELVO_API} BELVO_ID={REACT_APP_BELVO_SECRET_ID} BELVO_PASS={REACT_APP_BELVO_SECRET_PASSWORD} /></RequireAuth>
            } />
          <Route path="/account_list/:id" Component={
            (props) => <RequireAuth> <AccountList {...props} BELVO_URL={REACT_APP_BELVO_API} BELVO_ID={REACT_APP_BELVO_SECRET_ID} BELVO_PASS={REACT_APP_BELVO_SECRET_PASSWORD} /></RequireAuth>
          } />
          <Route path="/account_detail/:id/:link" Component={
            (props) => <RequireAuth> <AccountDetail {...props} BELVO_URL={REACT_APP_BELVO_API} BELVO_ID={REACT_APP_BELVO_SECRET_ID} BELVO_PASS={REACT_APP_BELVO_SECRET_PASSWORD} /></RequireAuth>
          } />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
