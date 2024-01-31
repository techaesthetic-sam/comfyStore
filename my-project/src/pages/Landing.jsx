import React from "react";
import { FeaturedProducts, Hero } from "../components";
import { customFetch } from "../utils";

const url = "/products?featured=true";

export async function loader() {
  const response = await customFetch(url);

  const products = response.data.data;
  // console.log({ products: products[0] });
  return { products };
}
export default function Landing() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
}
