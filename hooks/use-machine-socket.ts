"use client";

import { useEffect, useState } from "react";
import { getWebSocket, closeWebSocket } from "@/lib/websocket";
import type { MachineSocketData } from "@/types/machine";

export function useMachineSocket() {
  const [machineData, setMachineData] =
    useState<MachineSocketData | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    getWebSocket<MachineSocketData>(
      (data) => {
        setMachineData(data);
      },
      (status) => {
        setConnected(status);
      }
    );

    return () => {
      closeWebSocket();
    };
  }, []);

  return { machineData, connected };
}