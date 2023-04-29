// import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, loginRefresh } from "../Reducers/loggedInSlice";
import Cookies from "js-cookie";

function BasicChatApp({ appLoading }) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.loginReducer.username);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLoginCheck = () => {
    console.log("manual auth check");
    const url = "https://benchatapp.onrender.com/user/isLoggedIn";

    const cookieAuthToken = Cookies.get("authtoken");
    if (cookieAuthToken) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${cookieAuthToken}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.LoginCheck) {
            console.log(json);
            dispatch(
              login({
                isLoggedIn: true,
                username: json.username,
                authToken: json.newToken,
              })
            );
          } else {
            console.log(json);
            dispatch(
              logout({
                isLoggedIn: true,
                username: json.username,
                authToken: json.newToken,
              })
            );
          }
        })
        .catch((error) => console.log(error));
    } else {
      console.log("cookie does not exist");
      dispatch(logout());
    }
  };

  return (
    <div>
      {username ? (
        <div>
          <h1>Hello, {username}.</h1>
          <Button onClick={handleLogout}>Test Logout Button</Button>
        </div>
      ) : (
        <div>
          <h1>Welcome to my Basic Chat App!</h1>
          <p>You can login & signup via the link at the top right.</p>
        </div>
      )}

      <Button onClick={handleLoginCheck}>Am I logged in?</Button>
    </div>
  );
}

export default BasicChatApp;
