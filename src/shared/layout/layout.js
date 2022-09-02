import React from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { setIsCartOpen } from '../redux/features/cartSlice'
import Footer from './footer/footer'
import Header from './header/header'


const Layout = () => {
  const dispatch=useDispatch()

  return (
    <>
      <Header />
      <div  style={{minHeight:'94vh'}} onClick={() => dispatch(setIsCartOpen(false))}>
        <Outlet />
      </div>
      <Footer />

    </>

  )
}

export default Layout