import { useState } from "react";
import { socket } from "../socket";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
