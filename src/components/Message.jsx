import { useState } from "react";
import PropTypes from "prop-types";

import { EditMessage } from "./";
import { API_URL } from "../constants";

const Message = ({ message, fetchMessages }) => {
  const [replying, setReplying] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const handleLike = async (message) => {
    try {
      const response = await fetch(`${API_URL}/message/${message.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: message.likes + 1,
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

  const handleDelete = async (message) => {
    try {
      const response = await fetch(`${API_URL}/message/${message.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReply = async (message) => {
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
    <div className="message">
      <EditMessage message={message} fetchMessages={fetchMessages} />
      <div className="buttons-container">
        {!replying ? (
          <>
            <button
              className="reply btn"
              onClick={() => {
                setReplying(true);
              }}
            >
              <img src="/create.svg" alt="" />
            </button>
            <button className="like btn" onClick={() => handleLike(message)}>
              <img src="/like.svg" alt="" />
              <p>{message.likes}</p>
            </button>
            <button
              className="delete btn"
              onClick={() => {
                handleDelete(message);
              }}
            >
              <img src="/delete.svg" alt="" />
            </button>
          </>
        ) : (
          <>
            <form
              className="reply-container"
              onSubmit={(e) => {
                e.preventDefault();
                handleReply({
                  text: replyMessage,
                  parentId: message.id,
                });
                setReplying(false);
                setReplyMessage("");
              }}
            >
              <input
                type="text"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />
              <button className="reply btn" type="submit">
                <img src="/create.svg" alt="" />
              </button>
              <button
                className="cancel btn"
                type="button"
                onClick={() => setReplying(false)}
              >
                <img src="/cancel.svg" alt="" />
              </button>
            </form>
          </>
        )}
      </div>
      {message.children?.length > 0 &&
        message.children.map((message) => {
          return (
            <Message
              key={message.id}
              message={message}
              fetchMessages={fetchMessages}
            />
          );
        })}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.object,
  fetchMessages: PropTypes.func,
};

export default Message;
