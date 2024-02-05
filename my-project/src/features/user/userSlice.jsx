import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: {
    username: "coding addict",
  },
  theme: "dracula",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log(state);
    },
    logoutUser: (state) => {
      console.log(state);
    },
    toggleTheme: (state) => {
      console.log(state);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
export default userSlice.reducers;
