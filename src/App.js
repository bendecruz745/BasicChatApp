import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import NavBar from "./Components/NavBar";
import BasicChatApp from "./Components/BasicChatApp";
import Login from "./Components/Login";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <body className="App bg-secondary">
        <NavBar />
        <div className="container"></div>
        <Routes>
          <Route path="BasicChatApp" element={<BasicChatApp />} />
          <Route path="BasicChatApp/Login" element={<Login />} />
        </Routes>
      </body>
    </Provider>
  );
}

export default App;
