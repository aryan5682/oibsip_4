
import './App.css';
import Signup from './Component/AuthSign/Signup';
import Login from './Component/AuthSign/Login';

import { BrowserRouter as Router ,Route,Routes, Navigate } from 'react-router-dom';
import Main from './Component/Main';
function App() {
  const token=localStorage.getItem("token");

  return (
    <div className='App'>
  
<Router>
  <Routes>
  {token && <Route exact path='/main' element={<Main/>}/>}
  <Route exact path='/signup' element={<Signup/>}/>
  <Route exact path='/login' element={<Login/>}/>
  <Route path="/" element={<Navigate replace to="/login" />} />
  </Routes>
  
</Router>

    </div>
  );
}

export default App;
