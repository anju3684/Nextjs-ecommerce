/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import CartItem from '../components/CartItem'
import { ProductType } from '../state'
import Link from 'next/link'
import { getData } from '../utils/fetchData'
import PaypalBtn from './paypalBtn'
import { disconnect } from 'process'
const Cart: NextPage = () => {

  const { state, dispatch } = useContext(DataContext)
  const { cart, auth } = state

  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [payment, setPayment] = useState(false)
  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev: number, item: ProductType) => {

        return prev + (item.price * item.quantity)
      }, 0)
      setTotal(res)
    }
    getTotal()

  }, [cart])


  const handlePayment=()=>{
    if(!mobile || !address){
     return dispatch({type:'NOTIFY',payload:{error:'Please add your address and mobile number'}})
    }
    setPayment(true)
  }

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('cart01') || '[]')
    if (cartLocal && cartLocal.length > 0) {
      let newArr: ProductType[] = []
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`)
          const { _id, title, images, price, inStock, sold, description, content, category, checked } = res.product
          if (inStock > 0) {
            newArr.push({
              _id, title, images, price, inStock, sold,
              quantity: item.quantity > inStock ? 1 : item.quantity,
              checked,
              description,
              content,
              category
            })
          }
        }
        dispatch({ type: 'ADD_CART', payload: newArr })
      }
      updateCart()
    }
  }, [])

  if (cart.length === 0 || !cart) {
    return <Image src="/empty_cart.jpg" alt="empty_cart" width="1000px" height="1000px" ></Image>
  }
  return (
    <div className="row mx-auto">
      <Head>
        <title>Cart Page</title>
      </Head>
      <div className="col-md-8 text-secondary table-responsive my-3">
        <h2 className="text-uppercase">Shopping Cart</h2>
        <table className="table my-3">
          <tbody>
            {
              cart.map((item: ProductType) => (

                <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="col-md-4 my-3 text-right text-uppercase text-secondary">
        <form>
          <h2>Shipping</h2>

          <label htmlFor="address">Address</label>
          <input type="text" name="address" id="address"
            className="form-control mb-2"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />

          <label htmlFor="mobile">Mobile</label>
          <input type="text" name="mobile" id="mobile"
            className="form-control mb-2"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
          />
        </form>
        <h3>Total: <span className="text-danger">${total}</span></h3>
        {
          payment ? <PaypalBtn total={total} address={address} mobile={mobile} state={state} dispatch={dispatch}/> : <Link href={auth.user ? '#' : '/signin'}>
            <a className="btn btn-dark my-2"
            onClick={handlePayment}
            >Proceed with payment</a>
          </Link>
        }



      </div>
    </div>
  )
}

export default Cart