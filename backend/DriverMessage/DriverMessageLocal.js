// localStorage
const storage = { messages: [] };

function DriverGetMessages() {
  return storage.messages;
}

function DriverAddMessage(message) {
  storage.messages.push(message);
}

module.exports = { DriverGetMessages, DriverAddMessage };

  