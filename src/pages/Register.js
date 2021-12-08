import React, { useState, useContext } from 'react'
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { triggerContxet } from '../context/triggerContext';

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { setTrigModal } = useContext(triggerContxet)
  const navigate = useNavigate();

  const REGISTER_USER = gql`
  mutation MyQuery($email:String!,$password:String!) {
    register(email:$email,password: $password) {
      message
    }
  }
  `;

  const [register, { loading, error, data }] = useMutation(REGISTER_USER, {
    onCompleted: data => {
      setTrigModal(false)
      console.log(`data`, data)
      clearData();
      alert('Register is successful')
      navigate("/login");
    },
    onError: (err) => {
      setTrigModal(false)
      console.log(`err`, err.message)
      alert(err.message)
    }
  })

  const clearData = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleRegister = () => {
    try {
      if (email && password && confirmPassword && password === confirmPassword) {
        setTrigModal(true)
        register({ variables: { email, password } });
      }
      else {
        if (!email) alert('email is required!')
        else if (!password) alert('password is required!')
        else if (!confirmPassword) alert('confirmPassword is required!')
        else if (password !== confirmPassword) alert('password and confirm password are not match!')
      }
    }
    catch (err) {
      console.log('error: ', err)
    }
  }

  return (
    <div>
      <div className="container my-4 d-flex justify-content-center">
        <div className="card p-4 " style={{ maxWidth: '500px' }}>
          <h4>REGISTER</h4>
          <div>
            <div className="input-group mb-3 mt-4" style={{ maxWidth: '400px' }}>
              <span className="input-group-text" id="basic-addon3">Email</span>
              <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
            </div>
            <div className="input-group mb-3" style={{ maxWidth: '400px' }}>
              <span className="input-group-text" id="basic-addon3">Password</span>
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
            </div>
            <div className="input-group mb-3" style={{ maxWidth: '400px' }}>
              <span className="input-group-text" id="basic-addon3">Confirm Password</span>
              <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
            </div>
          </div>
          <div style={{ maxWidth: '400px' }}>
            <button onClick={handleRegister} className='btn btn-success float-end'>REGISTER</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
