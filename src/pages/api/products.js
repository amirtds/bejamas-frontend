import apolloClient from "../../lib/apolloClient";
import gql from "graphql-tag";

export default async (req, res) => {
  // all products
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

  // 2.3 All Products Data
  const { data: allProductsData } = await apolloClient.query({
    query: ALL_PRODUCTS_QUERY,
  });
  res.status(200).json(allProductsData.products);
};
