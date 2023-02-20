import type { NextPage } from 'next'
import { GetServerSideProps } from 'next';
import { getData } from '../utils/fetchData';
import { useState,useContext,useEffect } from 'react';
import Head from 'next/head';
import ProductItem from "../components/product/ProductItem"
import {ProductType} from "../state"
import { DataContext } from '../store/GlobalState';
import {useRouter} from 'next/router'
import Filter from "../components/Filter"
import filterSearch from '../utils/filterSearch'

type Props={
  productProps:ProductType[];
  result:number;
}


const Home: NextPage<Props> = (props: Props) => {
  const [products, setProducts] = useState(props.productProps)
  const [isCheck,setIsCheck]=useState(false)
  const [page, setPage] = useState(1)

  const {state, dispatch} = useContext(DataContext)
  const {auth} = state
  const router = useRouter()

  useEffect(() => {
    setProducts(props.productProps)
  },[props.productProps])

  useEffect(() => {
    if(Object.keys(router.query).length === 0) setPage(1)
  },[router.query])

  const handleCheck=(id:string)=>{
    products.forEach(product => {
      if(product._id === id) product.checked = !product.checked
    })
    setProducts([...products])

  }
  const handleCheckALL = () => {
    products.forEach(product => product.checked = !isCheck)
    setProducts([...products])
    setIsCheck(!isCheck)
  }

  const handleDeleteAll = () => {
    let deleteArr:any[] = [];
    products.forEach(product => {
      if(product.checked){
          deleteArr.push({
            data: '', 
            id: product._id, 
            title: 'Delete all selected products?', 
            type: 'DELETE_PRODUCT'
          })
      }
    })

    dispatch({type: 'ADD_MODAL', payload: deleteArr})
  }

  const handleLoadmore = () => {
    setPage((+page) + 1)
    filterSearch({router, page: page + 1})
  }
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Filter state={state}/>
      {
        auth.user && auth.user.role === 'admin' &&
        <div className="delete_all btn btn-danger mt-2" style={{marginBottom: '-10px'}}>
          <input type="checkbox" checked={isCheck} onChange={handleCheckALL}
          style={{width: '25px', height: '25px', transform: 'translateY(8px)'}} />

          <button className="btn btn-danger ml-2"
          data-toggle="modal" data-target="#exampleModal"
          onClick={handleDeleteAll}>
            DELETE ALL
          </button>
        </div>
      }

    <div className="products">

      {products.length===0 ? <><h2>No products</h2></> :
        products.map((value)=>(
          <ProductItem key={value._id} product={value} handleCheck={handleCheck}/>

        ))
      }
    </div>
    {
        props.result < +page * 6 ? ""
        : <button className="btn btn-outline-info d-block mx-auto mb-4"
        onClick={handleLoadmore}>
          Load more
        </button>
      }
    
    </>
  )
}



export const getServerSideProps: GetServerSideProps = async ({query}) => {

  const page:string|string[]= query.page || '1'
  const category = query.category || 'all'
  const sort = query.sort || ''
  const search = query.search || 'all'

  const res = await getData(
    `product?limit=${+page * 6}&category=${category}&sort=${sort}&title=${search}`,''
  )

  //server side rendering 
  return {
    props: {
      productProps: res.products,
      result: res.result
    },
  }
}

export default Home




