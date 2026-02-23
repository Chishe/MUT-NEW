import { NextResponse } from "next/server";

let latestAlarm: any = null;

export async function POST(req: Request) {
  const body = await req.json();

  latestAlarm = {
    ...body,
    timestamp: Date.now(),
  };

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(latestAlarm);
}