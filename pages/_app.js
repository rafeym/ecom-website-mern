import App from 'next/app'
import Layout from '../components/_App/Layout'

class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    // Put data from getInitialProps into pageProps
    let pageProps = {}

    // Check if a component has a getIntialProp property
    if(Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx)
    }

    // Return the object that returns the props
    return {pageProps: pageProps}
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    )
  }
}

export default MyApp
