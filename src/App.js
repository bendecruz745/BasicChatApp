import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ChatApp from "./Components/ChatApp";
import Profile from "./Components/Profile";
import ChatRoom from "./Components/ChatRoom";
// import { useDispatch } from "react-redux";
// import { loginRefresh } from "./Reducers/loggedInSlice";

function App() {
  console.log("main app loading");

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // dispatch(loginRefresh(navigate));

  return (
    <div className="App bg-secondary">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ChatApp" element={<ChatApp />} />
        <Route path="/ChatApp/:roomID" element={<ChatRoom />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
