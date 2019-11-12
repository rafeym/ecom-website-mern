import React from 'react'
import axios from 'axios'

function Home({products}) {
  console.log(products)

  // React.useEffect(() => {
  //   getProducts()
  // }, [])

  // fetching data on the client
  // const getProducts = async () => {
  //   const url = 'http://localhost:3000/api/product'
  //   const response = await axios.get(url)
  //   console.log(response.data)
  // }

  return <>home</>
}

// Fetching data from the server even before the compnent mounts
// Getting inital data which is being added to the props paramter of component itself
Home.getInitialProps = async () => {
  // 1. Fetch data on the server
  const url = 'http://localhost:3000/api/product'
  const response = await axios.get(url)
  // 2. Return that response data as an object
  return {products: response.data}
  // note: this object will be merged with existing props
}

export default Home
