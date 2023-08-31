import { useState, useEffect } from "react";

import { CreateMessage, Message } from "./components";
import { organizeMessagesHierarchy } from "../utils";
import { API_URL } from "./constants";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([]);
  const sortedMessages = [...messages].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });
  const organizedMessages = organizeMessagesHierarchy(sortedMessages);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/messages`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setMessages(data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="container">
      <h1>Spammer</h1>
      <CreateMessage fetchMessages={fetchMessages} />
      {organizedMessages.map((message) => (
        <Message
          key={message.id}
          message={message}
          fetchMessages={fetchMessages}
        />
      ))}
    </div>
  );
};

export default App;
