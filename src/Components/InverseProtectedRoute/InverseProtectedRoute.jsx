
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InverseProtectedRoute ({children}){
const navigate = useNavigate()
    useEffect(()=>{
        if (localStorage.getItem('token')) {
            navigate('/home')
        }
    },[])

    return children;

}