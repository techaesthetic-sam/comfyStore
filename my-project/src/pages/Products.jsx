import React from "react";
import { ProductsContainer, Filters, PaginationContainer } from "../components";
import { customFetch } from "../utils";

const url = "/products";

export async function loader({ request }) {
  const response = await customFetch(url);
  const products = response.data.data;
  const meta = response.data.meta;
  // console.log(products);
  return { products, meta };
}

export default function Products() {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
}
