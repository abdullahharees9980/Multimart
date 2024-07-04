import React,{useState} from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container,Row,Col,Form,FormGroup } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import {createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore';

import {auth} from '../firebase.config'
import {storage} from '../firebase.config'
import {db} from '../firebase.config'

import { toast } from 'react-toastify';

import '../styles/login.css'
import { async } from '@firebase/util';

const Signup = () => {

  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [file,setFile] = useState(null)
  const [loading,setLoading] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate =  useNavigate()

  const Signup = async(e)=>{
     e.preventDefault()
     setLoading(true)
     try {
      const userCredential = await createUserWithEmailAndPassword(auth,email,password)

      const user = userCredential.user

   
      {
       
          //store user data in firestore database
          await setDoc(doc(db,'users', user.uid),{
            uid:user.uid,
            displayName:username,
            email,
            
          }
          
          )
        
      }
     
      setLoading(false)
      toast.success('')
      navigate('/login')
     } catch (error) {
      setLoading(false)
      toast.error('something went wrong')
     }
  }

  return (
    <Helmet title='Signup'>
      <section>
        <Container>
          <Row>
            {
              loading? (<Col lg='12' className='text-center'><h5 className='fw-bold'>Loading.....</h5></Col> ):(            <Col lg='6' className='m-auto text-center'>
              <h3 className='fw-bold mb-4'>Signup</h3>

              <Form className='auth__form' onSubmit={Signup}>
              <FormGroup className='form__group'>
                  <input type="text"
                   placeholder='Username'
                   value={username} 
                   onChange={e=>setUsername(e.target.value)}/> 
                </FormGroup>

                <FormGroup className='form__group'>
                  <input type="email" placeholder='Enter your email'
                   value={email} onChange={e=>setEmail(e.target.value)}/> 
                </FormGroup>
                
                <FormGroup className='form__group'>
                  <input type="password" placeholder='Enter your password' 
                  value={password} onChange={e=>setPassword(e.target.value)}/>
                </FormGroup>

                <FormGroup className='form__group'>
    <input type="tel" placeholder='Enter your phone number' value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)}/>
  </FormGroup>
               

                <button type="submit" className="buy_btn auth_btn">Create an Account</button>
                <p>
                  Already have an account?{" "} 
                <Link to='/login'>Login</Link>
                  </p>
              </Form>
            </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Signup