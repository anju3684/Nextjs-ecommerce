/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState, useContext,useEffect } from 'react';
import { DataContext } from "../store/GlobalState"
import { postData } from "../utils/fetchData"
import { userdata,authuser } from '../state';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

const initialState = { email: '', password: '' };

const Signin: NextPage = () => {
  const [userData, setUserData] = useState<userdata>(initialState)
  const {  email, password } = userData;
  const router=useRouter()
  const { state, dispatch } = useContext(DataContext)
  const {auth}=state

  useEffect(()=>{
      if(auth.user){
          router.push("/")
      }
  },[auth])

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: 'NOTIFY', payload: { loading: true } })
    const res = await postData('auth/login', userData,'')
    if (res.err) {
      return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
    }
    dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
    dispatch({type:'AUTH',payload:{
      token:res.access_token,
      user:res.user
    }})
    Cookie.set('refreshToken',res.refresh_token,{
      path:'api/auth/accessToken',
      expires:7,

    })
    localStorage.setItem('firstLogin','true')
    
  }


  return (
    <div>
      <Head>
        <title>Sign in Page</title>
      </Head>
      <form className="mx-auto my-4" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            name="email" value={email} onChange={handleChangeInput} />
          <small id="emailHelp" className="form-text text-muted">We&apos;ll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"
            name="password" value={password} onChange={handleChangeInput} />
        </div>

        <button type="submit" className="btn btn-dark w-100">Login</button>

        <p className="my-2">
          You don&apos;t have an account? <Link href="/register"><a style={{ color: 'crimson' }}>Register Now</a></Link>
        </p>
      </form>
    </div>
  )
}

export default Signin