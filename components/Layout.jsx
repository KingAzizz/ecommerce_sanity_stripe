import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import GithubCorner from 'react-github-corner';

const Layout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
        <title>Alsunaydi Store</title>
      </Head> 
      <header>
      <GithubCorner href='https://github.com/KingAzizz/ecommerce_sanity_stripe' direction='left' />
        <Navbar />
      </header>
      <main className='main-container'>
      {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout