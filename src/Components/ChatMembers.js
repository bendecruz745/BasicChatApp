function ChatMembers({ chatMembers }) {
  const onlineMembers = chatMembers.filter(
    (member) => member.status === "Online"
  );
  const offlineMembers = chatMembers.filter(
    (member) => member.status === "Offline"
  );
  return (
    <div className="chat-members">
      <h1>Online Users</h1>
      <ol className="online-members">
        {onlineMembers.map((member) => (
          <li className="online-member-item">{member.username}</li>
        ))}
      </ol>
      <h1>Offline Users</h1>
      <ol className="offline-members">
        {offlineMembers.map((member) => (
          <li className="offline-member-item">{member.username}</li>
        ))}
      </ol>
    </div>
  );
}

export default ChatMembers;
