import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";
import { useReducer } from "react";

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: useReducer,
  },
});
