import { useRef } from "react";

import useChat from "../Hooks/useChat";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatMessage from "./ChatMessage";

const ChatRoom = () => {
  console.log("rendering chatroom");
  const navigate = useNavigate();
  const { messages, sendMessage } = useChat(useParams().roomID, navigate); // Creates a websocket and manages messaging
  const username = useSelector((state) => state.loginReducer.username);

  // const [newMessage, setNewMessage] = useState(""); // Message to be sent
  const newMessage = useRef();
  // console.log("chatroom here, messages is ", messages);

  // const handleNewMessageChange = (event) => {
  //   setNewMessage(event.target.value);
  // };

  const handleSendMessage = () => {
    // console.log("sending message, also chat history is ", messages);
    if (
      newMessage.current.value &&
      newMessage.current.value.replace(/\s/g, "").length
    ) {
      sendMessage(newMessage.current.value);
      newMessage.current.value = null;
    }
    // setNewMessage("");
  };

  return (
    <div className="chat-room-container d-flex flex-column align-items-center w-100">
      <h3 className="room-name m-0 mt-2">{useParams().roomID}</h3>
      <div className="messages-container">
        <ol className="messages-list d-flex flex-column-reverse p-0 m-0">
          {messages ? (
            messages
              .slice(0)
              .reverse()
              .map((message, i) => (
                <ChatMessage message={message} key={i} username={username} />
              ))
          ) : (
            <div>No messages to display</div>
          )}
        </ol>
      </div>
      <div className="new-message-field d-flex">
        <textarea
          // value={newMessage}
          // onChange={handleNewMessageChange}
          ref={newMessage}
          placeholder="Write message..."
          className="new-message-input-field w-75 border-0"
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          className="send-message-button w-25"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
