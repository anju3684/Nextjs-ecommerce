import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState,useContext,useEffect } from 'react';
import valid from '../utils/valid'
import { DataContext } from "../store/GlobalState"
import {postData} from "../utils/fetchData"
import { userdata } from '../state';
import {useRouter} from 'next/router'
const initialState = { name: '', email: '', password: '', cf_password: '' };
const Register: NextPage = () => {

  const [userData, setUserData] = useState<userdata>(initialState)
  const { name, email, password, cf_password } = userData;

  const {state,dispatch}=useContext(DataContext)
  const {auth}=state
  const router=useRouter()
  useEffect(()=>{
    if(auth.user){
        router.push("/")
    }
},[auth])

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    dispatch({type:'NOTIFY',payload:{}})
  }

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault()
    // console.log(userData)
    const errMsg=valid(userData)
    if(errMsg){
      console.log(errMsg)
      return dispatch({type:'NOTIFY',payload:{error:errMsg}})
    }
    dispatch({type:'NOTIFY',payload:{loading:true}})
    const res=await postData('auth/register',userData,'')
    // console.log(res)
    if(res.err){
      return dispatch({type:'NOTIFY',payload:{error:res.err}})
    }
    return dispatch({type:'NOTIFY',payload:{success:res.msg}})
  }

  return (
    <div>
      <Head>
        <title>Register Page</title>
      </Head>

      <form className="mx-auto my-4" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name"
            name="name" value={name} onChange={handleChangeInput} />
        </div>

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

        <div className="form-group">
          <label htmlFor="exampleInputPassword2">Confirm Password</label>
          <input type="password" className="form-control" id="exampleInputPassword2"
            name="cf_password" value={cf_password} onChange={handleChangeInput} />
        </div>

        <button type="submit" className="btn btn-dark w-100">Register</button>

        <p className="my-2">
          Already have an account? <Link href="/signin"><a style={{ color: 'crimson' }}>Login Now</a></Link>
        </p>
      </form>
    </div>
  )
}

export default Register