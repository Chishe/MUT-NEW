"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

interface Props {
  value?: number;
}

export default function CounterCard({ value = 0 }: Props) {
  return (
    <Card
      className="  bg-white/5
      border border-white/10
      backdrop-blur-lg
      rounded-2xl
      shadow-xl
      transition
      hover:border-zinc-400/40
      hover:shadow-zinc-500/10"
    >
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm text-muted-foreground">
          Counter เป้าหมาย
        </CardTitle>
        <Target className="h-12 w-12 text-primary" />
      </CardHeader>

      <CardContent>
        <p
          className="text-4xl font-bold tracking-wide text-emerald-300"
          style={{
            fontFamily: "var(--font-digital)",
            textShadow: `
      /* ขอบดำ */
      -1px -1px 0 #000,
       1px -1px 0 #000,
      -1px  1px 0 #000,
       1px  1px 0 #000,

      /* Glow */
      0 0 6px #34d399,
      0 0 12px #10b981,
      0 0 24px #059669,
      0 0 48px #047857
    `,
          }}
        >
          {value.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
