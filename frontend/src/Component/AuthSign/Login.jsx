import { useState } from 'react'
import React  from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import './signup.css'
export default function Signup() {
    const [data,setData]=useState({
        email:"",
        password:""
    })

    const navigate=useNavigate();
    const[error,setError]=useState("")
  
    const handleOnChange = ({ target }) => {
     
      setData({ ...data, [target.name]: target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
     
      try {
        const url = 'http://localhost:8000/api/users/login';
        const response = await axios.post(url, data);
       // console.log("Response data:", response.data);
        if (response.status === 200) {
          const token = response.data.data; // Make sure "token" matches the actual property name
          console.log(token);
          localStorage.setItem("token", token);
         navigate('/main');
         //console.log(token);
      }

        
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setError(error.response.data.message);
        }
        console.log(error);
      }

    }
  return (
    <div className='signup_container'>
      <div className='signup_form_container'>
        <div className='left' style={{ padding: '50px 25px'}}>
        <form className='form_container' onSubmit={handleSubmit}>
            <h1>Login to your Account</h1>
            <input type='email' placeholder='Email' name='email' onChange={handleOnChange} value={data.email} required className='input'></input>
            <input type='password' placeholder='Password' name='password' onChange={handleOnChange} value={data.password} required className='input'></input>
            {error && <div className='err_msg'>{error}</div>}
            <button type='submit' className='btnn' style={{background:'white' ,color:'black'}}>Sign In</button>
            </form>
        
        </div>
        <div className='right'>
        <h1>New Here?</h1>
            <Link to='/signup'>
                <button type='button' className='btn' style={{background:'#3bb19b', color:'black'}}>Sign Up</button>
            </Link>
        </div>
      </div>
    </div>
  )
}