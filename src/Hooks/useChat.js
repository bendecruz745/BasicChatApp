import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Reducers/loggedInSlice";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const RETRIEVE_DATA = "retrieveData";
const MEMBERS_UPDATE = "updateMembers";

const LOGGEDOUT_EVENT = "loggedOut";

// const SOCKET_SERVER_URL = "http://localhost:4000"; //dev
// const SOCKET_SERVER_URL = "https://benchatappbackend.onrender.com"; // live
const SOCKET_SERVER_URL = process.env.REACT_APP_BASE_URL;

const useChat = (roomId, navigate) => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const [chatMembers, setChatMembers] = useState([]);
  const username = useSelector((state) => state.loginReducer.username);
  const dispatch = useDispatch();

  const socketRef = useRef();
  console.log("useChat triggered");
  console.log(`roomID is ${roomId}`);

  useEffect(() => {
    // Creates a WebSocket connection
    console.log("Creating new websocket connection");
    const cookieAuthToken = Cookies.get("authtoken");
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: {
        roomId,
        Authorization: `bearer ${cookieAuthToken}`,
      },
    });

    socketRef.current.on(RETRIEVE_DATA, (data) => {
      console.log("received chat history data is ", data.chatMessages);
      console.log("received chat members, which is ", data.chatMembers);
      setMessages(data.chatMessages);
      setChatMembers(data.chatMembers);
    });

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderUsername === username,
      };
      console.log(
        "receiving message, message username is ",
        message.senderUsername
      );
      console.log("compared to redux store state username of  ", username);

      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on(LOGGEDOUT_EVENT, () => {
      dispatch(logout);
      navigate("/");
    });

    socketRef.current.on(MEMBERS_UPDATE, (data) => {
      console.log("members list updating, should be the following ", data);
      setChatMembers(data);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      console.log("disconnect firing");
      socketRef.current.disconnect();
    };
  }, [roomId, dispatch, navigate, username]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { messages, chatMembers, sendMessage };
};

export default useChat;
