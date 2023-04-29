import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { Route, Routes, useLocation, HashRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "./Components/NavBar";
import BasicChatApp from "./Components/BasicChatApp";
import Login from "./Components/Login";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { loginRefresh, login, logout } from "./Reducers/loggedInSlice";

function App() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("auto auth check");
    const url = "https://benchatappbackend.onrender.com/user/isLoggedIn";
    setLoading(true);

    const cookieAuthToken = Cookies.get("authtoken");
    if (cookieAuthToken) {
      console.log(`Cookie exists, its ${cookieAuthToken}`);
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
            setLoading(false);
          } else {
            console.log(json);
            dispatch(
              logout({
                isLoggedIn: true,
                username: json.username,
                authToken: json.newToken,
              })
            );
            setLoading(false);
          }
        })
        .catch((error) => console.log(error));
    } else {
      console.log("cookie does not exist");
      dispatch(logout());
      setLoading(false);
    }
  }, []);

  return (
    <div className="App bg-secondary">
      <NavBar />
      <Routes>
        <Route path="/" element={<BasicChatApp />} />
        <Route path="/BasicChatApp" element={<BasicChatApp />} />
        <Route path="/BasicChatApp/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
