import React from 'react'
import { removeToken } from '../service/localStorage';

function Navbar({ user }) {
  return (
    <div>
      <ul className="nav mb-4 d-flex justify-content-end" style={{ background: 'lightBlue' }}>
        <div className='d-flex'>
          <li className="nav-item">
            <a className="nav-link disabled">{user?.email}</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={() => { removeToken(); window.location.reload() }}>log out</a>
          </li>
        </div>
      </ul>
    </div>
  )
}

export default Navbar
