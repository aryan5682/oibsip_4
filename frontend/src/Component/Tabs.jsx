import React from 'react'
import { TABS } from '../Redux/actions/type'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, toggleTab } from '../Redux/actions';
export default function Tabs({currentTab}) {
    const dispatch=useDispatch();
   
    const todos = useSelector((state) => state.todos);
    const removeDoneTodos=()=>{
      todos.forEach(({done,_id})=>{
        if(done){
          dispatch(deleteTodo(_id));
        }
      })
  }
  return (
    <div className='button'>
    {TABS.map(tab=>(
        <button className={tab===currentTab ? 'button selected':'bttn'} 
        onClick={()=>dispatch(toggleTab(tab))}>{tab}</button> 
    ))}
     {
      todos.some(todo=>todo.done)?(
        <button onClick={removeDoneTodos} className='removetodos'>Remove Done Todo</button>
      ):''
    }
</div>
  )
}
