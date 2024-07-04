import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from '../pages/Login'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import ProductDetails from '../pages/ProductDetails'
import Checkout from '../pages/Checkout'
import Home2 from "../pages/Home2"

import Signup from '../pages/Signup'


const Routers = () => {
  return (
    <Routes>
    <Route path= "/" element={<Navigate to = 'home2' />}/>
    <Route path='home' element={<Home2/>}/>
    <Route path='home2' element={<Home2/>}/>
    <Route path='shop' element={<Shop/>}/>
    <Route path='shop/:id' element={<ProductDetails/>}/>
    <Route path='cart' element={<Cart/>}/>
    <Route path='checkout' element={<Checkout/>}/>
    

  


    <Route path='login' element={<Login/>}/>
    <Route path='signup' element={<Signup/>}/>
  </Routes>

  
)}

export default Routers