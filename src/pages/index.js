import gql from "graphql-tag";
import apolloClient from "../lib/apolloClient";
import Banner from "../components/banner";
import Header from "../components/header";
import Hero from "../components/hero";
import Products from "../components/products";
import Promo from "../components/promo";
import Footer from "../components/footer";
import { useState } from "react";

export default function Home({ banner, featuredProduct, allProducts, promo }) {
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(product) {
    console.log(product);
    setCartItems([...cartItems, product]);
  }
  function clearCart() {
    setCartItems([]);
  }
  return (
    <div>
      <Banner banner={banner} />
      <Header cartItems={cartItems} clearCart={clearCart}/>
      <Hero
        featuredProduct={featuredProduct}
        allProducts={allProducts}
        handleAddToCart={handleAddToCart}
      />
      <Promo promo={promo} />
      <Products allProducts={allProducts} handleAddToCart={handleAddToCart} />
      <Footer />
    </div>
  );
}

// 1. GQL Queries to get data from Strapi
// 1.1 Banner
const BANNER_QUERY = gql`
  query {
    banners {
      id
      enabled
      text
      buttonLink
      buttonText
    }
  }
`;

// 1.2 featured product
const FEATURED_PRODUCT_QUERY = gql`
  query {
    products(where: { featured: true }) {
      id
      name
      category
      price
      currency
      image {
        src
        alt
      }
      details {
        description
        dimensions {
          width
          height
        }
        size
      }
    }
  }
`;

// 1.3 all products
const ALL_PRODUCTS_QUERY = gql`
  query {
    products {
      id
      name
      category
      price
      currency
      image {
        src
        alt
      }
      details {
        description
        dimensions {
          width
          height
        }
        size
      }
    }
  }
`;

// 1.4 promo data
const PROMO_QUERY = gql`
  query {
    promos {
      enabled
      text
      buttonText
      buttonUrl
    }
  }
`;

export const getStaticProps = async () => {
  // 2 Execute GQL queries to get data from Strapi
  // 2.1 Banner Data
  const { data: bannerData } = await apolloClient.query({
    query: BANNER_QUERY,
  });
  // 2.2 Featured Product Data
  const { data: featuredProductData } = await apolloClient.query({
    query: FEATURED_PRODUCT_QUERY,
  });
  // 2.3 All Products Data
  const { data: allProductsData } = await apolloClient.query({
    query: ALL_PRODUCTS_QUERY,
  });
  // 2.4 Promo Data
  const { data: promoData } = await apolloClient.query({
    query: PROMO_QUERY,
  });
  return {
    props: {
      banner: bannerData.banners.length > 0 ? bannerData.banners[0] : null,
      featuredProduct:
        featuredProductData.products.length > 0
          ? featuredProductData.products[0]
          : null,
      allProducts: allProductsData.products,
      promo: promoData.promos.length > 0 ? promoData.promos[0] : null,
    },
  };
};
