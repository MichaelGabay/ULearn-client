import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/features/userSlice'
import { useDispatch } from "react-redux";

const Logout = () => {
    const dispatch = useDispatch();
    
    const nav = useNavigate()
    useEffect(()=>{
            localStorage.removeItem('token')
            dispatch(logout())
            nav('/')
    },[])
}

export default Logout