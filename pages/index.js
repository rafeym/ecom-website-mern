import React from 'react'
import axios from 'axios'
import ProductList from '../components/Index/ProductList'
import ProductPagination from '../components/Index/ProductPagination'
import baseUrl from '../utils/baseUrl'

function Home({ products, totalPages }) {
  return (
    <>
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} />
    </>
  )
}

// Fetching data from the server even before the compnent mounts
// Getting inital data which is being added to the props paramter of component itself
Home.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page : '1'
  const size = 9
  // 1. Fetch data on the server
  const url = `${baseUrl}/api/products`
  const payload = { params: { page, size } }

  const response = await axios.get(url, payload)
  // 2. Return that response data as an object
  return response.data
  // note: this object will be merged with existing props
}

export default Home
