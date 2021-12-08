import React, { useContext, useState } from 'react'
import { gql, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { setToken } from '../service/localStorage';
import { triggerContxet } from '../context/triggerContext';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setTrigModal } = useContext(triggerContxet)

  const LOGIN_USER = gql`
  query MyQuery($email:String!,$password:String!) {
    login(email:$email,password: $password) {
      token
    }
  }
  `;

  const [login] = useLazyQuery(LOGIN_USER, {
    onCompleted: data => {
      setTrigModal(false)
      console.log(`token`, data.login.token)
      setToken(data.login.token)
      window.location.reload()
    },
    onError: (err) => {
      setTrigModal(false)
      console.log(`err`, err.message)
      alert(err.message)
    }
  })

  const handleLogin = async () => {
    try {
      setTrigModal(true)
      login({ variables: { email, password } });
    }
    catch (err) {
      console.log('error: ', err.response)
      if (err.response.status === 400) {
        alert(err.response.data.message)
      }
    }
  }


  return (
    <div>
      <div className="container my-4 d-flex justify-content-center">
        <div className="card p-4 " style={{ maxWidth: '500px' }}>
          <h4>LOGIN</h4>
          <div>
            <div className="input-group mb-3 mt-4" style={{ maxWidth: '400px' }}>
              <span className="input-group-text" id="basic-addon3">Email</span>
              <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
            </div>
            <div className="input-group mb-3" style={{ maxWidth: '400px' }}>
              <span className="input-group-text" id="basic-addon3">Password</span>
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
            </div>
          </div>
          <div style={{ maxWidth: '400px' }}>
            <button onClick={handleLogin} className='btn btn-primary float-end'>LOGIN</button>
            <Link to='/register'><button className='btn btn-danger float-end mx-2'>REGISTER</button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
