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
    <div className="chat-room-container d-flex flex-column align-items-center w-100">
      <h1 className="room-name bg-success m-0 w-50">
        Room: {useParams().roomID}
      </h1>
      <div className="messages-container w-50">
        <ol className="messages-list d-flex flex-column-reverse p-0">
          {messages ? (
            messages
              .slice(0)
              .reverse()
              .map((message, i) => (
                <li
                  className={`message-item ${
                    username === message.senderUsername
                      ? "my-message"
                      : "received-message"
                  }`}
                >
                  <h4 className="message-useranme text-start m-0">
                    {message.senderUsername}
                  </h4>
                  <li key={i} className="message-text text-start">
                    {message.messageBody}
                  </li>
                </li>
              ))
          ) : (
            <div>No messages to display</div>
          )}
        </ol>
      </div>
      <div className="new-message-field w-50">
        <input
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
    </div>
  );
};

export default ChatRoom;
