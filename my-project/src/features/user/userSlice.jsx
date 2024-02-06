import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  dracula: "dracula",
  winter: "winter",
};
function getThemeFromLocalStorage() {
  const theme = localStorage.getItem("theme") || themes.winter;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
}

const initialState = {
  user: {
    username: "coding addict samhith",
  },
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // loginUser: (state, action) => {
    //   const {
    //     user: { username },
    //   } = action.payload;
    //   // console.log(user);
    //   console.log(username);
    //   //state.user = username;
    // },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    toggleTheme: (state) => {
      const { dracula, winter } = themes;
      state.theme = state.theme === dracula ? winter : dracula;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
export default userSlice.reducer;
