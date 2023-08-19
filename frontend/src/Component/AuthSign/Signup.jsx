import { useState } from 'react'
import React  from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import './signup.css'
export default function Signup() {
    const [data,setData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    })
    const navigate=useNavigate();
    const[error,setError]=useState("")
    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
   
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const url = 'http://localhost:8000/api/users';
        const response = await axios.post(url, data);
        console.log(response.data.message);
        navigate('/login');
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setError(error.response.data.message);
        }
        console.log(error);
      }
    };
  return (
    <div className='signup_container'>
      <div className='signup_form_container'>
        <div className='left'>
            <h1 style={{textAlign:'center'}}>Welcome Back</h1>
            <Link to='/login'>
                <button type='button' className='btn'>Sign In</button>
            </Link>
        </div>
        <div className='right'>
            <form className='form_container' onSubmit={handleSubmit}>
            <h1>create Account</h1>
            <input type='text' placeholder='FirstName' name='firstName' onChange={handleOnChange} value={data.firstName} required className='input'></input>
            <input type='text' placeholder='LastName' name='lastName' onChange={handleOnChange} value={data.lastName} required className='input'></input>
            <input type='email' placeholder='Email' name='email' onChange={handleOnChange} value={data.email} required className='input'></input>
            <input type='password' placeholder='Password' name='password' onChange={handleOnChange} value={data.password} required className='input'></input>
            {error && <div className='err_msg'>{error}</div>}
            <button type='submit' className='btnn' >Sign up</button>
            </form>
        </div>
      </div>
    </div>
  )
}
