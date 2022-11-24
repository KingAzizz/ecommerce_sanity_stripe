import React from 'react'
import {Product,FooterBanner,HeroBanner} from '../components'
import {client} from '../lib/client'
const Home = ({products,bannerData}) => {
  return (
    <>
    <HeroBanner  heroBanner={bannerData.length && bannerData[0]}/>
    <div className='products-heading'>
      <h2>Best Selling Product </h2>
      <p>Speakers of many variations</p>
    </div>

    <section className='products-container'>
     { products?.map(
      (product) => <Product key={product._id} product={product} />)}
    </section>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

export default Home

export const getServerSideProps = async () => {
   const query = '*[_type == "product"]'
   const products = await client.fetch(query)

   const bannerQuery = '*[_type == "banner"]'
   const bannerData = await client.fetch(bannerQuery)
   
   return {
    props:{products,bannerData}
   }
}