import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  ordersTotal: 0,
};

function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem("cart"));
}

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage() || defaultState,
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find(
        (item) => item.cartId === product.cartId
      );
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.amount * product.price;
      cartSlice.caseReducers.calculateTotals();
      toast.success("Item added to cart");
    },
    clearCart: (state) => {
      localStorage.setItem("cart", defaultState);
      return defaultState;
    },
    removeItem: (state, action) => {
      const { cartId } = action.payload;
      const product = state.cartItems.find((item) => item.cartId === cartId);
      state.cartItems = state.cartItems.filter(
        (item) => item.cartId !== cartId
      );
      state.numItemsInCart += product.amount;
      state.cartTotal += product.amount * product.price;
      cartSlice.caseReducers.calculateTotals();
      toast.error("item removed");
    },
    editItem: (state, action) => {
      const { amount, cartId } = action.payload;
      const item = state.cartItems.find((item) => item.cartId === cartId);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal = item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals();
      toast.error("item removed");
    },
    calculateTotals: (state) => {
      state.tax = state.cartTotal * 0.1;
      state.ordersTotal += state.cartTotal + state.tax + state.shipping;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
