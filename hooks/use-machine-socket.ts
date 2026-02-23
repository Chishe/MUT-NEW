"use client";

import { useEffect, useState } from "react";
import { getWebSocket, closeWebSocket } from "@/lib/websocket";

export function useMachineSocket() {
  const [machineData, setMachineData] = useState<any>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = getWebSocket((data) => {
      setMachineData(data);
    });

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);

    return () => {
      closeWebSocket();
    };
  }, []);

  return { machineData, connected };
}