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
      <ol className="online-members-list">
        {onlineMembers.map((member, index) => (
          <li key={index} className="online-member-item">
            {member.username}
          </li>
        ))}
      </ol>
      <h1>Offline Users</h1>
      <ol className="offline-members-list">
        {offlineMembers.map((member, index) => (
          <li key={index} className="offline-member-item">
            {member.username}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ChatMembers;
