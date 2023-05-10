import { useRef } from "react";

import useChat from "../Hooks/useChat";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ChatRoom = () => {
  const { messages, sendMessage } = useChat(useParams().roomID); // Creates a websocket and manages messaging
  const username = useSelector((state) => state.loginReducer.username);

  // const [newMessage, setNewMessage] = useState(""); // Message to be sent
  const newMessage = useRef();
  // console.log("chatroom here, messages is ", messages);

  // const handleNewMessageChange = (event) => {
  //   setNewMessage(event.target.value);
  // };

  const handleSendMessage = () => {
    // console.log("sending message, also chat history is ", messages);
    sendMessage(newMessage.current.value);
    newMessage.current.value = "";
    // setNewMessage("");
  };

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {useParams().roomID}</h1>
      <div className="messages-container">
        <ol className="messages-list overflow-auto d-flex flex-column-reverse">
          {messages ? (
            messages
              .slice(0)
              .reverse()
              .map((message, i) => (
                <li
                  key={i}
                  className={`message-item ${
                    username === message.senderUsername
                      ? "my-message"
                      : "received-message"
                  }`}
                >
                  {message.messageBody}
                </li>
              ))
          ) : (
            <div>No messages to display</div>
          )}
        </ol>
      </div>
      <textarea
        // value={newMessage}
        // onChange={handleNewMessageChange}
        ref={newMessage}
        placeholder="Write message..."
        className="new-message-input-field"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSendMessage();
          }
        }}
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default ChatRoom;
