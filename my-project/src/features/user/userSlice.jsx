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

// function getUserFromLocalStorage() {
//   try {
//     const userData = localStorage.getItem("user");
//     return userData ? JSON.parse(userData) : null;
//   } catch (error) {
//     console.error("Error parsing user data from local storage:", error);
//     return null;
//   }
// }

function getUserFromLocalStorage() {
  const user = localStorage.getItem("user");
  console.log(JSON.parse(user));
  return user ? JSON.parse(user) : null;
}
const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      //const user = { ...action.payload.user, token: action.payload.jwt };
      //console.log(user);
      const user = action.payload.user.username;
      console.log(user);
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
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
