const MessageList = ({ messages }) => {
    return (
      <div className="message-list">
        {messages.map((msg, i) => (
          <p key={i}>{msg.text}</p>
        ))}
      </div>
    );
  };
  
  export default MessageList;
  