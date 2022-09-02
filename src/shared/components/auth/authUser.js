import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CHECK_TOKEN_ROUTE } from '../../constant/url'
import { apiGet } from '../../services/services'

const AuthUser = () => {
    const nav = useNavigate()
    
    useEffect(()=>{
        checkToken()
    },[])

    const checkToken = async() =>{
        const {data} = await apiGet(CHECK_TOKEN_ROUTE)
        if(!data.status){
            nav('/login')
            
        }
    }
  return (
   <>
   </>
  )
}

export default AuthUser