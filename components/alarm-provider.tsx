"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type Alarm = {
  title: string;
  message?: string;
  address?: string;
  timestamp: number;
};

export default function AlarmProvider() {
  const [alarm, setAlarm] = useState<Alarm | null>(null);
  const [count, setCount] = useState(3);

  const lastTimestamp = useRef<number | null>(null);
  const isFirstLoad = useRef(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 🔥 Fetch Alarm
  useEffect(() => {
    const fetchAlarm = async () => {
      try {
        const res = await fetch("/api/alarms");
        if (!res.ok) return;

        const data: Alarm | null = await res.json();
        if (!data?.timestamp) return;

        // 🛑 โหลดครั้งแรก → แค่จำ timestamp แต่ไม่แสดง
        if (isFirstLoad.current) {
          lastTimestamp.current = data.timestamp;
          isFirstLoad.current = false;
          return;
        }

        // ✅ แสดงเฉพาะ timestamp ใหม่จริง ๆ
        if (data.timestamp > (lastTimestamp.current ?? 0)) {
          lastTimestamp.current = data.timestamp;
          setAlarm(data);
          setCount(3);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAlarm();
    const interval = setInterval(fetchAlarm, 2000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 Countdown
  useEffect(() => {
    if (!alarm) return;

    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setAlarm(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [alarm]);

  if (!alarm) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in">
      <div
        className={cn(
          "relative w-[650px] rounded-3xl border border-red-500/50",
          "bg-gradient-to-br from-black via-zinc-900 to-black",
          "shadow-[0_0_120px_rgba(255,0,0,0.6)]",
          "p-10 animate-in zoom-in-95 duration-300"
        )}
      >
        <div className="absolute inset-0 rounded-3xl border border-red-500/30 animate-pulse pointer-events-none" />

        <div className="flex items-start gap-6">
          <div className="bg-red-600/20 p-4 rounded-full border border-red-500">
            <AlertTriangle className="h-8 w-8 text-red-500 animate-pulse" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-red-500 tracking-widest">
              {alarm.title}
            </h2>

            {alarm.message && (
              <p className="mt-2 text-zinc-300 text-lg">{alarm.message}</p>
            )}

            {alarm.address && (
              <p className="mt-3 text-sm text-zinc-500">
                Address: {alarm.address}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-zinc-400">
            Closing in{" "}
            <span className="text-red-500 font-bold text-lg">
              {count}s
            </span>
          </div>

          <button
            onClick={() => setAlarm(null)}
            className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 transition-all duration-200 text-white font-semibold shadow-lg shadow-red-500/40"
          >
            ACKNOWLEDGE
          </button>
        </div>
      </div>
    </div>
  );
}