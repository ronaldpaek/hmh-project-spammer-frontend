import { useState } from "react";
import PropTypes from "prop-types";

import { API_URL } from "../constants";

const CreateMessage = ({ fetchMessages }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleCreateMessage = async (message) => {
    try {
      const response = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <form
      className="create-container"
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateMessage({ text: newMessage });
        setNewMessage("");
      }}
    >
      <input
        type="text"
        placeholder="What's your message?"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button className="create btn" type="submit">
        <img src="/create.svg" alt="" />
      </button>
    </form>
  );
};

CreateMessage.propTypes = {
  fetchMessages: PropTypes.func.isRequired,
};

export default CreateMessage;
