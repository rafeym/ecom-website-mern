import React from 'react'
import axios from 'axios'
import ProductList from '../components/Index/ProductList'

function Home({products}) {
  return <ProductList products={products}/>
}

// Fetching data from the server even before the compnent mounts
// Getting inital data which is being added to the props paramter of component itself
Home.getInitialProps = async () => {
  // 1. Fetch data on the server
  const url = 'http://localhost:3000/api/products'
  const response = await axios.get(url)
  // 2. Return that response data as an object
  return {products: response.data}
  // note: this object will be merged with existing props
}

export default Home
