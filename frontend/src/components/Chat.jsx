import { useState, useEffect } from "react";
import { socket } from "../socket";
import axios from "axios";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/messages")
      .then(response => setMessages(response.data));

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("message");
  }, []);

  return (
    <div className="chat-container">
      <h2>🔥 Real-Time Chat</h2>
      <MessageList messages={messages} />
      <MessageInput />
    </div>
  );
};

export default Chat;
