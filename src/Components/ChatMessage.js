function ChatMessage({ message, index, username }) {
  const timeSent = new Date(message.timeSent);
  const currentDate = new Date();
  let hours = timeSent.getHours();
  let minutes = timeSent.getMinutes();
  let whenSent = "Today";
  let ampm = "am";

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (hours > 12) {
    hours -= 12;
    ampm = "pm";
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (
    currentDate.getDate() - 1 === timeSent.getDate() &&
    currentDate.getMonth() === timeSent.getMonth() &&
    currentDate.getFullYear() === timeSent.getFullYear()
  ) {
    whenSent = "Yesterday";
  } else if (
    currentDate.getDate() !== timeSent.getDate() ||
    currentDate.getMonth() !== timeSent.getMonth() ||
    currentDate.getFullYear() !== timeSent.getFullYear()
  ) {
    whenSent = `${timeSent.getDate()}/${timeSent.getMonth()}/${timeSent.getFullYear()}`;
  }

  const messageBody = message.messageBody.replace(/\\n/g, `\n`);

  return (
    <li
      key={index}
      className={`message-item ${
        username === message.senderUsername ? "my-message" : "received-message"
      }`}
    >
      <div className="d-flex align-items-center">
        <h4 className="message-username text-start m-0 ms-1">
          {message.senderUsername}
        </h4>
        <h5 className="message-timesent text-start m-0 ms-1">
          {whenSent + " " + hours + ":" + minutes + ampm}
        </h5>
      </div>

      <div className="message-text text-start ms-1">{messageBody}</div>
    </li>
  );
}

export default ChatMessage;
