const findTopLevelMessages = (messages) => {
  const topLevelMessages = messages.filter((message) => !message.parentId);
  return topLevelMessages;
};

const attachChildMessages = (messages, topLevelMessages) => {
  const organizedMessages = topLevelMessages.map((message) => {
    const children = messages.filter(
      (childMessage) => childMessage.parentId === message.id
    );
    const organizedChildMessages = attachChildMessages(messages, children);
    return {
      ...message,
      children: organizedChildMessages,
    };
  });

  return organizedMessages;
};

const organizeMessagesHierarchy = (messages) => {
  const topLevelMessages = findTopLevelMessages(messages);
  const organizedMessages = attachChildMessages(messages, topLevelMessages);
  return organizedMessages;
};

export { organizeMessagesHierarchy };
