import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ChatRoomJoin = () => {
  const [roomName, setRoomName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const joinRoomHandler = () => {
    navigate(`/ChatApp/${roomName}`);
  };

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <div className="chat-room-join">
      <h1 className="chat-room-join-title">Type in a chat room to join</h1>
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            joinRoomHandler();
          }
        }}
      />
      <Button
        onClick={joinRoomHandler}
        className="enter-room-button standard-button ms-2"
      >
        Join room
      </Button>
    </div>
  );
};

export default ChatRoomJoin;
