import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  const result = await pool.query(
    "SELECT  id, title, message, is_read, created_at FROM machine_alarms ORDER BY created_at DESC"
  );

  const formatted = result.rows.map((row) => ({
    id: row.id,
    title: row.title,
    message: row.message,
    isRead: row.is_read,
    createdAt: row.created_at,
  }));

  return NextResponse.json(formatted);
}
export async function PATCH(req: Request) {
  const body = await req.json();

  await pool.query(
    `
    UPDATE machine_alarms
    SET is_read = true,
        read_at = NOW()
    WHERE id = $1
    `,
    [body.id],
  );

  return NextResponse.json({ success: true });
}

export async function PUT() {
  await pool.query(
    `
    UPDATE machine_alarms
    SET is_read = true,
        read_at = NOW()
    WHERE is_read = false
    `,
  );

  return NextResponse.json({ success: true });
}
