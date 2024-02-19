import React from "react";
import { ProductsContainer, Filters, PaginationContainer } from "../components";
import { customFetch } from "../utils";

const url = "/products";
// export async function loader({ request }) {
const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;

  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => customFetch(url, { params: queryParams }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    // const response = await customFetch.get(url);

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );

    const products = response.data.data;
    const meta = response.data.meta;
    // console.log(params);
    // console.log(products);
    return { products, meta, params };
  };

export default function Products() {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
}
