import React from 'react'

export default function Header() {
  return (
    <div className='header' style={{display:'flex',alignItems:'center',justifyContent:'center',minWidth:'300px',flexWrap:'wrap'}}>
      <h1 style={{fontSize:'6rem',textAlign:'center',color:'black',fontWeight:'200'}}>To Do List</h1>
    </div>
  )
}
