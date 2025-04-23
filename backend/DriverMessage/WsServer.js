// ws-server.js
const WebSocket = require("ws");
const { addMessage } = require("./DriverMessageLocal");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const message = JSON.parse(data);
    addMessage(message);

    // Broadcast to all
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  });

  ws.send(JSON.stringify({ sender: "system", text: "ยินดีต้อนรับ!", time: "00:00" }));
});

console.log("🔌 WebSocket server running at ws://localhost:8080");
