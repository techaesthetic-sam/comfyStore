import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "./pages";

import { ErrorElement } from "./components";
import { loader as loadingElement } from "./pages/Landing";
import { loader as singlePageLoader } from "./pages/SingleProduct";
import { loader as productsLoader } from "./pages/Products";
import { loader as checkoutLoader } from "./pages/Checkout";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as checkoutAction } from "./components/CheckoutForm";

import { store } from "./store";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: loadingElement,
      },
      {
        path: "products",
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: productsLoader,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singlePageLoader,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      { path: "about", element: <About /> },
      {
        path: "checkout",
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store),
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
