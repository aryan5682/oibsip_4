import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';


const Logout = () => {
  const navigate = useNavigate();
  
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate('/login');
  }
    return (
      <div style={{display:'flex',justifyContent:'center',alignItems:'center' ,flexDirection:'column' ,paddingTopTop:'30px'}}>
        <div>
       <FontAwesomeIcon icon={faUser} size="3x" />
       </div>
        <button onClick={handleLogout} style={{color:'black'}} className='btnn'>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
        </button>
      
        </div>
    );
};

export default Logout;

