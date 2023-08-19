
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faClock, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteTodo, toggleTodo, updateTodo } from '../Redux/actions';
import {useDispatch} from 'react-redux'
export default function Todo({todo}) {
  const dispatch=useDispatch();
 
  const [editing,setEditing]=useState(false);
  const [text,setText]=useState(todo.data);
  const onFormSubmit=(e)=>{
   e.preventDefault();
   setEditing(prevState=>!prevState);
   dispatch(updateTodo(todo._id,text))
  }
  return (
     <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <li  style={{
    padding:'13px',margin:'10px',listStyle:'none',width:'600px',
    minWidth:'300px' ,fontSize:'1.2rem' ,borderRadius:'5px',cursor:'pointer'
    ,textDecoration:todo.done?'line-through':'',backgroundColor:todo.done?'brown ':'#3bb19b',color:todo.done?'':''}}>
      <span style={{display:editing?'none':''}}>{todo.data}</span>
      <form style={{display:editing?'inline':'none'}} onSubmit={onFormSubmit}>
         <input type='text' value={text} className='edit' onChange={(e)=>setText(e.target.value)}>
         </input>
      </form>
      <span className='icon' onClick={()=>dispatch(deleteTodo(todo._id))}  style={{float:'right',marginRight:'20px'}}><FontAwesomeIcon icon={faTrash} size="1x" /></span>
      <span className='icon' onClick={()=>setEditing(prevState=>!prevState)} style={{float:'right',marginRight:'20px'}}><FontAwesomeIcon icon={faPen} size="1x" /></span>
      {
        todo.done? <span className='icon' onClick={()=>dispatch(toggleTodo(todo._id))}
        style={{float:'right',marginRight:'20px'}}><FontAwesomeIcon icon={faClipboardCheck} size="1x" /></span>: 
        <span className='icon' onClick={()=>dispatch(toggleTodo(todo._id))}
        style={{float:'right',marginRight:'20px'}}><FontAwesomeIcon icon={faClock} size="1x" /></span>
      }
    </li>
   
    </div>
  )
}
