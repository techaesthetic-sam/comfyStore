import React from "react";
import { FeaturedProducts, Hero } from "../components";
import { customFetch } from "../utils";

const url = "/products?featured=true";

const featuredProducts = {
  queryKey: ["featuredProducts"],
  queryFn: () => customFetch(url),
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProducts);
  //console.log(response);
  const products = response.data.data;
  //console.log(products);
  return { products };
};
export default function Landing() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
}
