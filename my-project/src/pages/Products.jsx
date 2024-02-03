import React, { useEffect } from "react";
import { ProductsContainer, Filters, PaginationContainer } from "../components";
import { customFetch } from "../utils";

const url = "/products";
export async function loader({ request }) {
  // const response = await customFetch.get(url);

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const response = await customFetch(url, { params });

  const products = response.data.data;
  const meta = response.data.meta;
  //console.log(request);
  // console.log(products);
  return { products, meta, params };
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
