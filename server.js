
const WebSocket = require('ws');
const PORT = process.env.PORT || 10000;

const wss = new WebSocket.Server({ port: PORT }, () =>
  console.log(`✅ WebSocket server running on port ${PORT}`)
);

wss.on('connection', (ws) => {
  console.log("🔌 New client connected");

  ws.on('message', (msg) => {
    console.log("📨 Received:", msg.toString());

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });
});
