import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <>
      <h1>Login</h1>
      <Link to="/signup">Sign Up</Link>
    </>
  )
}

export default Login