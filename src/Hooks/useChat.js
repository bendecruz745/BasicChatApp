import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const RETRIEVE_CHAT_HISTORY = "retrieveChatHistory";

// const SOCKET_SERVER_URL = "http://localhost:4000"; //dev
// const SOCKET_SERVER_URL = "https://benchatappbackend.onrender.com"; // live
const SOCKET_SERVER_URL = process.env.REACT_APP_BASE_URL;

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();
  console.log("useChat triggered");
  console.log(`roomID is ${roomId}`);

  useEffect(() => {
    // Creates a WebSocket connection
    console.log("Creating new websocket connection");
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(RETRIEVE_CHAT_HISTORY, (chatHistory) => {
      console.log("received chat history data is ", chatHistory.chatMessages);
      setMessages(chatHistory.chatMessages);
    });

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      console.log("disconnect firing");
    };
  }, [roomId]);

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
