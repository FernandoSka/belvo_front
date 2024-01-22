import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  }
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import React, { useState, SyntheticEvent, useEffect } from 'react';
import {Navigate, Link} from 'react-router-dom';
import authService from '../auth_system/auth';


const Register = () => {

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [last_name, setLastName] = useState('')
    const [password2, setPassword2] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        if(authService.isAuthenticated()){
            setRedirect(true)
            
        }
    })
    if(redirect){
        return <Navigate to="/" />
    }
    const create_user = async ()=>{
      try {
        const response =  await fetch(BACKEND_URL+"/dashboard/create_user/",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password,
              name: name,
              last_name: last_name,
              password2: password2,
            })
          }).then((response) =>{
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            }).then(result => {
                setRedirect(true)
            })
          }
          catch(error){
            console.error('Error al hacer login', alert(JSON.stringify(await error.json())));
            return false;
          }
    }

    const submit = async(e: SyntheticEvent) => {
        e.preventDefault();
        create_user()
    }

    return(
        <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">Logo</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
            <form onSubmit={submit}>
              <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Register</h3>

              <MDBInput onChange={e => setEmail(e.target.value)} wrapperClass='mb-4 mx-5 w-100' label='Email' id='formemail' type='email' size="lg" />
              <MDBInput onChange={e => setName(e.target.value)} wrapperClass='mb-4 mx-5 w-100' label='Name' id='formname' type='text' size="lg" />
              <MDBInput onChange={e => setLastName(e.target.value)} wrapperClass='mb-4 mx-5 w-100' label='Last Name' id='formlastname' type='text' size="lg" />
              <MDBInput onChange={e => setPassword(e.target.value)} wrapperClass='mb-4 mx-5 w-100' label='Password' id='formpass' type='password' size="lg" />
              <MDBInput onChange={e => setPassword2(e.target.value)} wrapperClass='mb-4 mx-5 w-100' label='Confirm Password' id='formpass2' type='password' size="lg" />

              <MDBBtn type='submit' className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>Register</MDBBtn>
              <p className='ms-5'>Already have an account? <Link to="/login">Login here</Link></p>
            </form>
          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
    );
}

export default Register;