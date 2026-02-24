import { NextResponse } from "next/server";
import type { Alarm } from "@/types/alarm";

let latestAlarm: Alarm | null = null;

export async function POST(req: Request) {
  const body: Omit<Alarm, "timestamp"> = await req.json();

  latestAlarm = {
    ...body,
    timestamp: Date.now(),
  };

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(latestAlarm);
}