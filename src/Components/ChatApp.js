// import React, { useState } from "react";
// import { Button } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import { logout, loginRefresh } from "../Reducers/loggedInSlice";
import Cookies from "js-cookie";
import ChatRoomJoin from "./ChatRoomJoin";

function ChatApp() {
  console.log("rendering ChatApp component");
  console.log(Cookies.get("authtoken"));
  // const username = useSelector((state) => state.loginReducer.username);

  // dispatch(loginRefresh(navigate));

  return (
    <div className="d-flex flex-column align-items-center">
      <ChatRoomJoin />
    </div>
  );
}

export default ChatApp;
