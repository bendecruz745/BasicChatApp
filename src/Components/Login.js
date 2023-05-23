import React, { useState, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import "../CSS/Login.css";
import AlertBox from "./Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Reducers/loggedInSlice";

function Login() {
  // const [passwordField, setPasswordField] = useState("");
  const passwordFieldRef = useRef();
  // const [usernameField, setUsernameField] = useState("");
  const usernameFieldRef = useRef();
  const [disableButton, setDisableButton] = useState(false);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({
    display: false,
    errorType: "danger",
    errorText: "placeholder",
  });
  const navigate = useNavigate();

  // console.log("rendering Login component");

  const handleLogin = (event) => {
    const usernameField = usernameFieldRef.current.value;
    const passwordField = passwordFieldRef.current.value;
    if (passwordField && usernameField) {
      setDisableButton(true);
      // console.log("handleLogin in Login.js run");
      const loginData = { username: usernameField, password: passwordField };
      dispatch(login({ loginData, setAlert, setDisableButton, navigate }));
      setDisableButton(false);
    } else {
      setAlert({
        display: true,
        errorType: "warning",
        errorText: "Username or Password field empty",
      });
    }
  };

  const handleSignup = (event) => {
    const usernameField = usernameFieldRef.current.value;
    const passwordField = passwordFieldRef.current.value;
    if (passwordField) {
      setDisableButton(true);
      // const url = "https://benchatappbackend.onrender.com/user/login"; // live
      // const url = "http://localhost:4000/user/login"; // dev
      const url = process.env.REACT_APP_BASE_URL + "/user/signup";
      const data = { username: usernameField, password: passwordField };

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.username) {
            // console.log(json);
            setAlert({
              display: true,
              errorType: "success",
              errorText: `User ${json.username} created`,
            });
          } else {
            // console.log(json);
            setAlert({
              display: true,
              errorType: "danger",
              errorText: json.error,
            });
          }
          setDisableButton(false);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Container className="loginPage d-flex flex-column justify-content-center align-items-center">
      <div className="w-50 h-25 d-flex flex-column justify-content-center align-items-center">
        {alert.display && (
          <AlertBox variant={alert.errorType} text={alert.errorText} />
        )}

        <h1>Login</h1>
        <div className="inputFields d-flex flex-column ">
          <div className="usernameField d-flex justify-content-between mb-2 mt-3">
            Username:
            <input
              className="ms-1 username-input-field"
              id="usernameInput"
              placeholder="Username"
              // value={usernameField}
              // onChange={(event) => {
              //   setUsernameField(event.target.value);
              // }}
              ref={usernameFieldRef}
            />
          </div>
          <div className="passwordField d-flex justify-content-between">
            Password:
            <input
              className="ms-1 password-input-field"
              id="passwordInput"
              placeholder="Password"
              // value={passwordField}
              type="password"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleLogin(event);
                }
              }}
              // onChange={(event) => {
              //   setPasswordField(event.target.value);
              // }}
              ref={passwordFieldRef}
            />
          </div>
        </div>
        <div>
          <Button
            disabled={disableButton}
            className="m-4 standard-button"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            disabled={disableButton}
            className="m-4 standard-button"
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Login;
