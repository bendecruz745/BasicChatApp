import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Reducers/loggedInSlice";
import { io } from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const RETRIEVE_CHAT_HISTORY = "retrieveChatHistory";
const LOGGEDOUT_EVENT = "loggedOut";

// const SOCKET_SERVER_URL = "http://localhost:4000"; //dev
// const SOCKET_SERVER_URL = "https://benchatappbackend.onrender.com"; // live
const SOCKET_SERVER_URL = process.env.REACT_APP_BASE_URL;

const useChat = (roomId, navigate) => {
  const [messages, setMessages] = useState([]); // Sent and received messages
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

    socketRef.current.on(RETRIEVE_CHAT_HISTORY, (chatHistory) => {
      console.log("received chat history data is ", chatHistory.chatMessages);
      setMessages(chatHistory.chatMessages);
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

  return { messages, sendMessage };
};

export default useChat;
