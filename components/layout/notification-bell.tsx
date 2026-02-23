"use client";

import { Bell, CheckCheck } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface Notification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await fetch("/api/notification");
    const data = await res.json();
    setNotifications(Array.isArray(data) ? data : []);
  };

  // ✅ Optimistic Update (ไม่ต้อง fetch ใหม่ทั้ง list)
  const markAsRead = async (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );

    await fetch("/api/notification", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };

  const markAllAsRead = async () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );

    await fetch("/api/notification", { method: "PUT" });
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-muted transition"
      >
        <Bell className="w-5 h-5" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[10px] flex items-center justify-center bg-red-500 text-white rounded-full animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-popover border rounded-xl shadow-xl max-h-96 overflow-hidden z-50 animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b">
            <span className="text-sm font-semibold">
              Notifications
            </span>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-primary hover:underline"
              >
                Read All
              </button>
            )}
          </div>

          {/* Body */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                ไม่มีการแจ้งเตือน
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => !n.isRead && markAsRead(n.id)}
                  className={`p-4 border-b cursor-pointer transition-all duration-200 hover:bg-muted/60 ${
                    !n.isRead
                      ? "bg-muted/40"
                      : "opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">
                        {n.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {n.message}
                      </p>
                    </div>

                    {n.isRead && (
                      <CheckCheck className="w-4 h-4 text-green-500 ml-2 shrink-0" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}