"use client";

import { useEffect, useState } from "react";

export function useDatabaseHealth(intervalMs: number = 5000) {
  const [dbConnected, setDbConnected] = useState(false);

  useEffect(() => {
    const checkDB = async () => {
      try {
        const res = await fetch("/api/health");
        const data = await res.json();
        setDbConnected(data.database);
      } catch {
        setDbConnected(false);
      }
    };

    checkDB();
    const interval = setInterval(checkDB, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return { dbConnected };
}