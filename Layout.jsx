import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routers/Routers'
import {useLocation} from "react-router-dom"
import useGetCart from '../../custom-hooks/useGetCart'

const Layout = () => {

  const location = useLocation()
  
  const getCart = useGetCart()
  return <>
  {
    location.pathname.startsWith('/dashboard') ? <AdminNav/> :  <Header/>
  }
 
  <div>
    <Routers/>
  </div>
  <Footer/>
  </>
}

export default Layout