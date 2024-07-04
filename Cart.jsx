import React from 'react';
import '../styles/cart.css';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container,Row,Col } from 'reactstrap';
import { motion } from 'framer-motion';
import { cartActions } from '../redux/slices/cartSlice';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { db } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import {toast} from 'react-toastify'
import { useState } from 'react';
import { useEffect } from 'react';


const Cart = () => {
  
  const totalAmount = useSelector(state => state.cart.totalAmount)
  const cart = useSelector(state => state.cart.cartItems)
  return (
    <Helmet title='Cart'>
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg='9'>
              {
                cart.length ===0 ? ( 
                <h2 className="fs-4 text-center">No items added to cart</h2> 
                ):(
                <table className="table bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    cart.map((item,index)=>(
                      <Tr item={item} key={index}/>
                    ))
                  }
                </tbody>

              </table>
              )}

          
            </Col>
            
            <Col lg='3'></Col> 

            <div>
                    <h6 className='d-flex align-items-center  justify-content-between'>
                      Subtotal
                      <span className='fs-4 fw-bold'>${totalAmount}</span>
                    </h6>
                  </div>
                  <p className='fs-6 mt-2'>taxes and shipping will calculate when checkout</p>
                 

                  <div>
                  <button className="buy_btn w-40"><Link to='/checkout'>Checkout</Link></button>
                  </div>
                  <div>
                    <button className="buy_btn w-30  mt-3"><Link to='/shop'>Continue Shopping</Link></button>
                  </div>
 
                 
          </Row>
        </Container>
      </section>
    </Helmet>

  )
}

const Tr = ({item})=> {
  const dispatch = useDispatch()

  const deleteProduct = async(id)=>{
    dispatch(cartActions.deleteItem(item.id))
    await deleteDoc(doc(db,'cart', id))
    toast.success('Product Deleted!')
    
    
  }
  return(
    <tr >
                    <td><img src={item.imgUrl} alt="" /></td> 
                    <td>{item.productName}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}px</td>
                    <td>
                    <td><button onClick={()=>{deleteProduct(item.id)}} className='btn btn-danger'>Remove</button></td>
                      </td>
                  </tr>
  )
}

export default Cart