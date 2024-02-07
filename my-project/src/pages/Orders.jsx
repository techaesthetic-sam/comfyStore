import React from "react";
import { redirect, useLoaderData } from "react-router";
import { customFetch } from "../utils";
import { PaginationContainer, SectionTitle } from "../components";
import OrdersList from "../components/OrdersList";
export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn("You need to login");
      return redirect("/login");
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const response = await customFetch.get("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      //console.log(response);
      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      //console.log(error.response.request.status);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error placing your order";

      toast.error(errorMessage);
      if (error.response.request.status === 401 || 403) redirect("/login");

      return null;
    }
  };
export default function Orders() {
  const { meta, orders } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle title="please make the order" />;
  }
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <PaginationContainer />
    </>
  );
}
