"use client";

import { useEffect, useState, useCallback } from "react";

export interface Notification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // 🔹 fetch function (รองรับ showLoading เฉพาะครั้งแรก)
  const fetchNotifications = useCallback(
    async (showLoading = false) => {
      try {
        if (showLoading) setLoading(true);

        const res = await fetch("/api/notification", {
          cache: "no-store", // กัน cache
        });

        if (!res.ok) return;

        const data = await res.json();
        setNotifications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch notification error:", err);
      } finally {
        if (showLoading) setLoading(false);
      }
    },
    []
  );

  // 🔹 mark read (optimistic update)
  const markAsRead = async (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );

    try {
      await fetch("/api/notification", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      console.error("Mark as read error:", err);
    }
  };

  // 🔹 mark all read
  const markAllAsRead = async () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );

    try {
      await fetch("/api/notification", {
        method: "PUT",
      });
    } catch (err) {
      console.error("Mark all read error:", err);
    }
  };

  // 🔹 polling ทุก 1 วิ
  useEffect(() => {
    // โหลดครั้งแรกโชว์ loading
    fetchNotifications(true);

    // หลังจากนั้นอัปเดตทุก 1 วิ (ไม่โชว์ loading)
    const interval = setInterval(() => {
      fetchNotifications(false);
    }, 1000);

    return () => clearInterval(interval);
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  };
}