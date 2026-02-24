"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge } from "lucide-react";

interface Props {
  value?: number;
}

export default function SpeedCard({ value = 0 }: Props) {
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
          Speed (bottle/min)
        </CardTitle>
        <Gauge className="h-12 w-12 text-primary" />
      </CardHeader>

      <CardContent>
        <p
          className="text-4xl font-bold tracking-wide text-amber-300"
          style={{
            fontFamily: "var(--font-digital)",
            textShadow: `
      /* ขอบดำ */
      -1px -1px 0 #000,
       1px -1px 0 #000,
      -1px  1px 0 #000,
       1px  1px 0 #000,

      /* glow */
      0 0 6px #fbbf24,
      0 0 12px #f59e0b,
      0 0 24px #d97706
    `,
          }}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
