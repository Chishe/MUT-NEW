"use client";

import type { WebSocketHandler } from "@/types/websocket";

let socket: WebSocket | null = null;
let reconnectInterval: ReturnType<typeof setInterval> | null = null;

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:1880/mut";

function stopReconnectLoop() {
  if (reconnectInterval) {
    clearInterval(reconnectInterval);
    reconnectInterval = null;
  }
}

function startReconnectLoop<T>(
  onMessage: WebSocketHandler<T>,
  onStatusChange?: (connected: boolean) => void
) {
  if (reconnectInterval) return;

  reconnectInterval = setInterval(() => {
    if (!socket || socket.readyState === WebSocket.CLOSED) {
      console.log("🔁 Trying to reconnect...");
      connect(onMessage, onStatusChange);
    }
  }, 2000);
}

function connect<T>(
  onMessage: WebSocketHandler<T>,
  onStatusChange?: (connected: boolean) => void
) {
  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log("🟢 Connected");
    onStatusChange?.(true);
    stopReconnectLoop();
  };

  socket.onmessage = (event: MessageEvent<string>) => {
    try {
      const parsed: T = JSON.parse(event.data);
      onMessage(parsed);
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  };

  socket.onerror = () => {
    console.log("⚠️ WebSocket error");
  };

  socket.onclose = () => {
    console.log("🔴 Disconnected");
    onStatusChange?.(false);
    socket = null;
    startReconnectLoop(onMessage, onStatusChange);
  };
}

export function getWebSocket<T>(
  onMessage: WebSocketHandler<T>,
  onStatusChange?: (connected: boolean) => void
): WebSocket {
  if (
    socket &&
    (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING)
  ) {
    return socket;
  }

  connect(onMessage, onStatusChange);
  startReconnectLoop(onMessage, onStatusChange);

  return socket!;
}

export function closeWebSocket(): void {
  stopReconnectLoop();

  if (socket) {
    socket.close();
    socket = null;
  }
} 