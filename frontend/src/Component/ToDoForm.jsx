import React, { useState } from 'react'
import { addNewTodo } from '../Redux/actions';
import { useDispatch } from 'react-redux';
export default function ToDoForm() {
    const [text,setText]=useState('');
    const dispatch=useDispatch();
    const onFormSubmit=(e)=>{
        e.preventDefault();//prevent deafault functionality of browser
        dispatch(addNewTodo(text)); 
    }
    const onChangeArea=(e)=>{
     setText(e.target.value);
    }
  return (
    <div>
      <form className='form' style={{display:'flex',justifyContent:'center',alignItems:'center',
      flexWrap:'wrap',color:'white'}} onSubmit={onFormSubmit}>
        <input placeholder='Type your To Do Here' style={{fontSize:'25px',textAlign:'center'
        ,width:'50%',minWidth:'300px',background:'transparent',color:'black',border:'none',outline:'none',borderBottom:'2px solid black'}} onChange={onChangeArea}>

        </input>
      </form>
    </div>
  )
}
