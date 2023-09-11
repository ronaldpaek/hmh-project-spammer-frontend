import { useState } from "react";
import PropTypes from "prop-types";

import { API_URL } from "../constants";

const EditMessage = ({ message, fetchMessages }) => {
  const [editing, setEditing] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(message.text);

  const handleEdit = async (message) => {
    try {
      const response = await fetch(`${API_URL}/messages/${message.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: message.text,
        }),
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
    <div className="edit-container">
      {!editing ? (
        <>
          <p>{currentMessage}</p>
          <button
            className="edit btn"
            type="button"
            onClick={() => {
              setEditing(true);
            }}
          >
            <img src="/edit.svg" alt="" />
          </button>
        </>
      ) : (
        <>
          <form
            className="edit-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit({ id: message.id, text: currentMessage });
              setEditing(false);
            }}
          >
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => {
                setCurrentMessage(e.target.value);
              }}
            />
            <button className="save btn" type="submit">
              <img src="/thumb-up.svg" alt="" />
            </button>
            <button
              className="cancel btn"
              type="button"
              onClick={() => {
                setCurrentMessage(message.text);
                setEditing(false);
              }}
            >
              <img src="/cancel.svg" alt="" />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

EditMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  fetchMessages: PropTypes.func.isRequired,
};

export default EditMessage;
