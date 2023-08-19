import React, { useEffect } from 'react';
import {  getAllTodos } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ALL_TODOS,DONE_TODOS,ACTIVE_TODOS } from '../Redux/actions/type';
import Todo from './Todo';
  import Tabs from './Tabs';
export default function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [todos]);
const currentTab=useSelector(state=>state.currentTab);
const getTodos=()=>{
  if(currentTab===ALL_TODOS){
    return todos;
  }
  else if(currentTab===DONE_TODOS){
    return todos.filter(todo=>todo.done)
  }
  else if(currentTab===ACTIVE_TODOS){
    return todos.filter(todo=>!todo.done)
  }
}
  return (
    <div>
      <div>
    <Tabs currentTab={currentTab}/>
      </div>
      <ul>
        {getTodos().map((todo) => (
        //   <li key={todo._id} style={{listStyle:'none'}}>{todo.data}</li>
        <Todo key={todo._id} todo={todo}/>
        ))}
      </ul>
    </div>
  );
}
