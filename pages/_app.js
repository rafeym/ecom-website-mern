import App from 'next/app'
import Layout from '../components/_App/Layout'
import { parseCookies } from 'nookies'
import { redirectUser } from '../utils/auth'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'

class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    // Get all our cookies
    const { token } = parseCookies(ctx)

    // Put data from getInitialProps into pageProps
    let pageProps = {}

    // Check if a component has a getIntialProp property
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // If user does not have a token we dont want to make a unnecessary req
    if (!token) {
      const isProtectedRoute =
        ctx.pathname === '/account' || ctx.pathname === '/create'
      if (isProtectedRoute) {
        redirectUser(ctx, '/login')
      }
    }
    // If token exists, try to request user account data
    else {
      try {
        const payload = { headers: { Authorization: token } }
        const url = `${baseUrl}/api/account`
        const response = await axios.get(url, payload)
        const user = response.data
        pageProps.user = user
      } catch (error) {
        console.error('Error getting current user', error)
      }
    }

    // Return the object that returns the props
    return { pageProps: pageProps }
  }
  // Passing pageProps as a prop to the Layout and Component making it available throughout all components
  render() {
    const { Component, pageProps } = this.props
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp
