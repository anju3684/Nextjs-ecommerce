import type { NextPage } from 'next'
import { GetServerSideProps } from 'next';
import { getData } from '../utils/fetchData';
import { useState } from 'react';
import Head from 'next/head';
import ProductItem from "../components/product/ProductItem"
import {ProductType} from "../state"

type Props={
  productProps:ProductType[];
  result:number;
}


const Home: NextPage<Props> = (props: Props) => {
  const [products, setProducts] = useState(props.productProps)

  return (
    <div className="products">

      <Head>
        <title>Home Page</title>
      </Head>
      {!products ? <><h2>No products</h2></> :
        products.map((value)=>(
          <ProductItem key={value._id} product={value}/>

        ))
      }
    </div>
  )
}



export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getData('product','')

  //server side rendering 
  return {
    props: {
      productProps: res.products,
      result: res.result
    },
  }
}

export default Home