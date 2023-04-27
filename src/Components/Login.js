import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "../CSS/Login.css";
import AlertBox from "./Alert";
import { useNavigate } from "react-router-dom";

function Login() {
  const [passwordField, setPasswordField] = useState("");
  const [usernameField, setUsernameField] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [alert, setAlert] = useState({
    display: false,
    errorType: "danger",
    errorText: "placeholder",
  });
  const navigate = useNavigate();

  const handleLogin = (event) => {
    if (passwordField) {
      setDisableButton(true);
      const url = "https://benchatapp.onrender.com/user/login";
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
          if (json.token) {
            console.log(json);
            localStorage.setItem("authToken", json.token);
            setAlert({
              display: true,
              errorType: "success",
              errorText: "Logging in....",
            });
            navigate("/BasicChatApp");
          } else {
            console.log(json);
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

  const handleSignup = (event) => {
    if (passwordField) {
      setDisableButton(true);
      const url = "https://benchatapp.onrender.com/user/signup";
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
            console.log(json);
            setAlert({
              display: true,
              errorType: "success",
              errorText: `User ${json.username} created`,
            });
          } else {
            console.log(json);
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
              className="ms-1"
              id="usernameInput"
              placeholder="Username"
              value={usernameField}
              onChange={(event) => {
                setUsernameField(event.target.value);
              }}
            />
          </div>
          <div className="passwordField d-flex justify-content-between">
            Password:
            <input
              className="ms-1"
              id="passwordInput"
              placeholder="Password"
              value={passwordField}
              type="password"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleLogin(event);
                }
              }}
              onChange={(event) => {
                setPasswordField(event.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <Button
            disabled={disableButton}
            className="m-4"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            disabled={disableButton}
            className="m-4"
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
