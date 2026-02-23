"use client";

let socket: WebSocket | null = null;
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:1880/ws";

export function getWebSocket(
  onMessage: (data: any) => void
): WebSocket {

  if (socket) {
    socket.close();
  }

  console.log("Connecting to:", WS_URL);

  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log("🟢 Connected");
  };

  socket.onmessage = (event) => {
    try {
      const parsed = JSON.parse(event.data);
      onMessage(parsed);
    } catch (err) {
      console.error("Invalid JSON:", err);
    }
  };

  socket.onerror = (err) => {
    console.error("⚠️ WS error:", err);
  };

  socket.onclose = (e) => {
    console.log("🔴 Closed:", e.code);

    reconnectTimeout = setTimeout(() => {
      getWebSocket(onMessage);
    }, 2000);
  };

  return socket;
}

export function closeWebSocket() {
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
  }

  if (socket) {
    socket.close();
    socket = null;
  }
}