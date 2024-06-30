import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../components/Wrapper'

function SignUp() {
  return (
    <Wrapper>
      <h1>Sign Up</h1>
      <Link to="/">Login</Link>
    </Wrapper>
  )
}

export default SignUp