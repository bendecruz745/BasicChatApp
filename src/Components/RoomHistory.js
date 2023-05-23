import { useNavigate } from "react-router-dom";

function RoomHistory({ roomHistoryData }) {
  const navigate = useNavigate();
  const handleRoomChange = (element) => {
    navigate(`/ChatApp/${element}`);
  };

  return (
    <div className="room-history-container">
      <h1 className="room-history-title">Room History</h1>
      <ol className="room-history-list">
        {roomHistoryData
          .slice(0)
          .reverse()
          .map((element, index) => (
            <li
              onClick={() => handleRoomChange(element)}
              className="room-history-item"
              key={index}
            >
              <h5>{element}</h5>
            </li>
          ))}
      </ol>
    </div>
  );
}

export default RoomHistory;
