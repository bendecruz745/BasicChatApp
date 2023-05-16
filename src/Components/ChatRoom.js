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
  let messageTracker = 0;
  let messageTimeMs = 0;
  let trackedMessageMs = 0;

  for (let i = 0; i < messages.length; i++) {
    // console.log("Here message ", messages[i]);
    if (typeof messages[i] === "undefined") {
      continue;
    }
    messageTimeMs = new Date(messages[i].timeSent).getTime();
    trackedMessageMs = new Date(messages[messageTracker].timeSent).getTime();
    if (i === 0) {
      messageTracker = 0;
      continue;
    } else if (
      messages[i].senderUsername !== messages[messageTracker].senderUsername
    ) {
      messageTracker = i;
      continue;
    }

    if (
      messageTimeMs <= trackedMessageMs + 300000 &&
      messageTimeMs >= trackedMessageMs
    ) {
      messages[
        messageTracker
      ].messageBody = `${messages[messageTracker].messageBody} \n ${messages[i].messageBody}`;
      delete messages[i];
    } else {
      messageTracker = i;
    }
  }

  const parsedMessages = messages.filter((element) => {
    return element !== undefined;
  });

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
    <div className="chat-room d-flex">
      <div className="server-list">TBD Server list</div>
      <div className="chat-room-container d-flex flex-column">
        <div className="room-name-container m-0 p-0 d-flex justify-content-center align-items-center">
          <h3>{useParams().roomID}</h3>
        </div>
        <div className="messages-container">
          <ol className="messages-list d-flex flex-column-reverse p-0 m-0">
            {parsedMessages ? (
              parsedMessages
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
      <div className="user-list">TBD User List in current server view</div>
    </div>
  );
};

export default ChatRoom;
