import React, {  useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import { Navigate, useLocation } from 'react-router-dom';

const privateRout = ({children}) => {
    const {user, loading}=useContext(AuthContext);
    const location=useLocation();
    if(loading){
        return <progress className="progress w-full"></progress>;
    }
    if(user?.email){
        return children;
    }
    return <Navigate to='/login' replace state={{from:location}}></Navigate>;
};

export default privateRout;