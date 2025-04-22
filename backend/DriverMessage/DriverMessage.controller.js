const { DriverGetMessages, DriverAddMessage } = require("./DriverMessageLocal");

exports.getMessages = (req, res) => {
  res.json(DriverGetMessages());
};

exports.postMessage = (req, res) => {
  const message = req.body;
  DriverAddMessage(message);
  res.status(201).json({ success: true });
};