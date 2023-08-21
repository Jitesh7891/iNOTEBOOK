import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    const json = await response.json()
    console.log(json)

    if (json.success) {
      //Save the auth-token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/")
      props.showAlert('Login Succeesful', 'success')
    }
    else {
      props.showAlert('Please login using valid credentials', 'danger')
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const gotoSignUp = () => {
    navigate("/signup")
  }

  return (
    <div className='my-5 mt-3'>
      <h2>Login to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2" >
          <label htmlFor="email">Email address</label>
          <input onChange={onChange} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input onChange={onChange} type="password" className="form-control" id="password" name="password" placeholder="Password" value={credentials.password} />
        </div>
        <button type="submit my-2" className="btn btn-primary" >Submit </button>
      </form>
      <h2 className='' style={{ fontWeight: '550', marginTop: '30px' }}>
        New User?
      </h2>
      <button type="submit " className="btn btn-success" onClick={gotoSignUp}>SignUp</button>

    </div>
  )
}

export default Login
