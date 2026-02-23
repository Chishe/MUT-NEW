import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    await pool.query("SELECT 1");

    return NextResponse.json({
      status: "ok",
      database: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("DB Connection Error:", error);

    return NextResponse.json(
      {
        status: "error",
        database: false,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
