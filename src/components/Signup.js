import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmpassword: "" });
  let navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    })
    const json = await response.json()
    console.log(json)
    if (credentials.password !== credentials.confirmpassword) {

      props.showAlert('Password dont match , Please try again','danger')
    }
    else if (json.success) {
      //Save the auth-token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/")
      props.showAlert('Account created successfully', 'success')
    }
    else {
      props.showAlert('Email is invalid or User with this email already exists please try again', 'danger')
    }

  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div className='my-3'>
      <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3" >
          <label htmlFor="email">Name</label>
          <input onChange={onChange} type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter Name (minimum 3 letters)" value={credentials.name} minLength={3} required />
        </div>
        <div className="form-group my-3" >
          <label htmlFor="email">Email address</label>
          <input onChange={onChange} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} required />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input onChange={onChange} type="password" className="form-control" id="password" name="password" placeholder="Password" value={credentials.password} minLength={5} required />
        </div>
        <div className="form-group my-3">
          <label htmlFor="password"> Confirm Password</label>
          <input onChange={onChange} type="password" className="form-control" id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" value={credentials.confirmpassword} minLength={5} required />
        </div>
        <button disabled={credentials.name.length<3}type="submit" className="btn btn-primary my-2">Submit</button>
      </form>
    </div>
  )
}

export default Signup
