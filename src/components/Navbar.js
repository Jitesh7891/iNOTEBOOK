import React, { useEffect,useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {useNavigate} from'react-router-dom'
import noteContext from '../context/notes/NoteContext';

const Navbar = () => {
  const context = useContext(noteContext);
  const { username,getusername } = context;


  let navigate =useNavigate();

  let location = useLocation();
  useEffect(() => {
    // console.log(location.pathname);
    getusername()
    // console.log(name)
  }, );

  const handleLogout=()=>{
    localStorage.removeItem('token')
    let prompt1=window.confirm("Are you sure you want to logout?")
    if(prompt1){
    navigate("/login")
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
            </li>

          </ul>
          </div >
          {localStorage.getItem('token')&&<div className='userstyle mx-1'><h2>Welcome {username} !</h2></div>}
          </div>
{!localStorage.getItem('token')?
<>
        <Link className="btn btn-danger  mx-1" to="/login" role="button">Login</Link>
        <Link className="btn btn-success mx-1" to="/signup" role="button">Signup</Link>
     </>
      :<div>
        <button onClick={handleLogout} style={{backgroundColor: '#feae96',
backgroundImage: 'linear-gradient(315deg, #feae96 0%, #fe0944 74%)',color:'white'}}  className='btn mx-2'>Logout</button>
        </div>}
    </nav>
  )
}

export default Navbar
