import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

var initialState = {
  isLoggedIn: false,
  authToken: "",
  username: "",
  testVal: 1,
};

const loggedInSlice = createSlice({
  name: "logincheck",
  initialState,
  reducers: {
    loginSuccess: (state, data) => {
      state.isLoggedIn = true;
      state.authToken = data.payload.authToken;
      state.username = data.payload.username;
    },
    logoutSuccess: (state, data) => {
      state.isLoggedIn = false;
      state.authToken = "";
      state.username = "";
    },
  },
});

export const { loginSuccess, logoutSuccess } = loggedInSlice.actions;

export const login =
  ({ loginData, setAlert, setDisableButton, navigate }) =>
  async (dispatch) => {
    // console.log(
    //   `Saving login state, username is ${username} with token ${authToken} with login state ${isLoggedIn}`
    // );
    // const url = "https://benchatappbackend.onrender.com/user/login"; // live
    // const url = "http://localhost:4000/user/login"; // dev
    const url = process.env.REACT_APP_BASE_URL + "/user/login";

    // console.log("login in loggedInSliceReducer run");

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.token) {
          // console.log(json);
          const username = json.username;
          const authToken = json.token;
          // console.log(
          //   `This is login in loggedInSlice, authToken is ${authToken}`
          // );
          Cookies.set("authtoken", authToken, { expires: 1 });
          dispatch(loginSuccess({ username, authToken }));
          setAlert({
            display: true,
            errorType: "success",
            errorText: "Logging in....",
          });
          setDisableButton(false);
          navigate("/ChatApp");
        } else {
          // console.log(json);
          setAlert({
            display: true,
            errorType: "danger",
            errorText: json.error,
          });
        }
        return json;
      })
      .catch((error) => console.log(error));
  };

export const testSomething = () => async (dispatch) => {
  console.log("test something");
};

export const loginRefresh =
  ({ navigate }) =>
  async (dispatch) => {
    // console.log(
    //   `auto auth check, cookie picked up is ${Cookies.get("authtoken")}`
    // );
    // const url = "https://benchatappbackend.onrender.com/user/isLoggedIn"; //live
    // const url = "http://localhost:4000/user/isLoggedIn"; //dev
    const url = process.env.REACT_APP_BASE_URL + "/user/isLoggedIn";

    const cookieAuthToken = Cookies.get("authtoken");
    if (cookieAuthToken !== undefined) {
      // console.log(`Cookie exists, its ${cookieAuthToken}`);
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${cookieAuthToken}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json) {
            // console.log(json);
            const username = json.username;
            const authToken = json.newToken;
            // console.log(
            //   `This is loginRefresh in loggedInSlice, authToken is ${authToken}`
            // );
            // console.log(`here is the rest of the json ${JSON.stringify(json)}`);
            Cookies.set("authtoken", authToken, { expires: 1 });
            dispatch(loginSuccess({ username, authToken }));
          } else {
            // console.log(json);
            console.log("failure refreshing/verifying login, logging out");
            dispatch(logout());
          }
        })
        .catch((error) => console.log(error));
    } else {
      // console.log("cookie does not exist");
      dispatch(logoutSuccess());
    }
    // Cookies.set("authtoken", authToken, { expires: 1 });
    // dispatch(loginSuccess({ username, authToken }));
  };

export const logout = () => async (dispatch) => {
  // console.log(`Logout reducer being called`);
  Cookies.remove("authtoken");
  dispatch(logoutSuccess());
};

export default loggedInSlice.reducer;
