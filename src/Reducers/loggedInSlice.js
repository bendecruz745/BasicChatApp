import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isLoggedIn: false,
  authToken: "",
  username: "",
};

const loggedInSlice = createSlice({
  name: "logincheck",
  initialState,
  reducers: {
    loginSuccess: (state, data) => {
      state.isLoggedIn = data.payload.isLoggedIn;
      state.authToken = data.payload.authToken;
      state.username = data.payload.username;
    },
    logoutSuccess: (state, data) => {
      state.isLoggedIn = false;
      state.authToken = "Fillerlogout";
      state.username = "";
    },
    loginRefresh: (state, data) => {
      state.isLoggedIn = true;
      state.authToken = data.payload.authToken;
      state.username = data.payload.username;
    },
  },
});

export const { loginSuccess, logoutSuccess } = loggedInSlice.actions;

export const login =
  ({ isLoggedIn, username, authToken }) =>
  async (dispatch) => {
    console.log(
      `Saving login state, username is ${username} with token ${authToken} with login state ${isLoggedIn}`
    );
    Cookies.set("authtoken", authToken, { expires: 1 });
    dispatch(loginSuccess({ isLoggedIn, username, authToken }));
  };

export const logout = () => async (dispatch) => {
  console.log(`Logout reducer being called`);
  Cookies.set("authtoken", "");
  dispatch(logoutSuccess());
};

export const loginRefresh =
  ({ username, authToken }) =>
  async (dispatch) => {
    console.log(
      `Saving login state, username is ${username} with token ${authToken}`
    );
    Cookies.set("authtoken", authToken, { expires: 1 });
    dispatch(loginSuccess({ username, authToken }));
  };

export default loggedInSlice.reducer;
