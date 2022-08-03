/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/role-supports-aria-props */

import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { DataContext } from "../store/GlobalState"
import { userdata, authuser } from "../state"
import Cookie from "js-cookie"

const NavBar: NextPage = () => {

  const router = useRouter()
  const { state, dispatch } = useContext(DataContext)
  const { auth, cart } = state


  const isActive = (r: string) => {
    if (r === router.pathname) {
      return "Active"
    }
    else {
      return ""
    }
  }


  const handleLogout = () => {
    Cookie.remove('refreshToken', { path: 'api/auth/accessToken' })
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
    dispatch({ type: 'NOTIFY', payload: { success: 'Logged out' } })
  }

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

          <img src={(auth as authuser).user?.avatar || ''} alt="" style={{
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            transform: 'translateY(-3px)',
            marginRight: '3px',
          }}
          /> {(auth as authuser).user?.name}
        </a>

        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link href="/profile">
            <a className="dropdown-item">Profile</a>
          </Link>

          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleLogout} >Logout</button>
        </div>
      </li>
    )

  }


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link href="/">
          <a className="navbar-brand" href="#">Anjali</a>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">

          <ul className="navbar-nav p-1">
            <li className="nav-item active">
              <Link href="/cart">
                <a className={"nav-link" + isActive('/cart')}><i className="fas fa-shopping-cart position-relative" aria-hidden="true"><span className="position-absolute" style={{
                  padding: "3px 6px",
                  background: '#ed143dc2',
                  borderRadius: '50%',
                  top: '-10px',
                  right: '-10px',
                  color: 'white',
                  fontSize: '14px'
                }}>{cart.length}</span></i>Cart</a>
              </Link>
            </li>
            {
              Object.keys(auth as authuser).length === 0 ?
                <>
                  <li className="nav-item active">
                    <Link href="/signin">
                      <a className={"nav-link" + isActive('/signin')}><i className="fas fa-user" aria-hidden="true"></i>Sign in</a>
                    </Link>
                  </li></> : loggedRouter()

            }

          </ul>
        </div>
      </nav>
    </>
  )
}

export default NavBar
