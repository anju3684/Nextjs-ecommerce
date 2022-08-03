import { useState, useContext, useEffect } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getData } from "../../utils/fetchData"
import { useRouter } from 'next/router'
import Link from 'next/link'
import { DataContext } from '../../store/GlobalState'
import { Order } from "../../state"
import OrderDetail from '../../components/OrderDetail'
const DetailOrder = () => {
    const { state, dispatch } = useContext(DataContext)
    const { orders, auth } = state
    const router = useRouter()
    const [orderDetail, setOrderDetail] = useState([{}])

    useEffect(() => {
        const newArr = orders.filter((order: Order) => order._id === router.query.id)
        setOrderDetail(newArr)
    }, [orders])
    if(!auth.user) return null;
    return (
        <div className="my-3">
            <Head>
                <title>Order Detail Page</title>
            </Head>
            <div>
                <button className="btn btn-dark" onClick={() => router.back()}>
                    <i className="fas fa-long-arrow-alt-left"  aria-hidden="true"></i> Go Back
                </button>
            </div>
            
            <OrderDetail orderDetail={orderDetail} state={state} dispatch={dispatch} />
        
        </div>
    )
}
export default DetailOrder