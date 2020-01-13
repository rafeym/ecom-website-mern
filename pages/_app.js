import App from 'next/app'
import Layout from '../components/_App/Layout'
import { parseCookies, destroyCookie } from 'nookies'
import { redirectUser } from '../utils/auth'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import Router from 'next/router'

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

        // Check if role prop is root or admin
        const isRoot = user.role === 'root'
        const isAdmin = user.role === 'admin'
        // If authenticated, but not admin or root role, redirect from 'create' page
        const isNotPermitted =
          !(isRoot || isAdmin) && ctx.pathname === '/create'
        if (isNotPermitted) {
          redirectUser(ctx, '/')
        }

        pageProps.user = user
      } catch (error) {
        console.error('Error getting current user', error)
        // 1. Throw out invalid token
        destroyCookie(ctx, 'token')
        // 2. Redirect to login page
        redirectUser(ctx, '/login')
      }
    }

    // Return the object that returns the props
    return { pageProps: pageProps }
  }

  componentDidMount() {
    // Executes call back when local storage changes
    window.addEventListener('storage', this.syncLogout)
  }

  syncLogout = event => {
    if (event.key === 'logout') {
      Router.push('/login')
    }
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
