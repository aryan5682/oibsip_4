import React from 'react'
import Header from './Header'
import ToDoForm from './ToDoForm'
import Logout from './AuthSign/Logout'
import Todos from './Todos'

export default function Main() {
  return (
    <div>
      <div > <Logout/></div>
    <div>
      <Header/>
      <ToDoForm/>
      <Todos/>
    </div>
    </div>
  )
}
