import React from 'react'
import authService from './auth'
import { Navigate, Route } from 'react-router-dom'
import Login from '../home/Login';

const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }) => {
    const userIsLogged = authService.isAuthenticated(); // Your hook to get login status
 
    if (!userIsLogged) {
       return <Login />;
    }
    return children;
 };

export default RequireAuth