"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Factory } from "lucide-react";

interface Props {
  value?: number;
}

export default function ProductionCard({ value = 0 }: Props) {
  return (
    <Card className="  bg-white/5
                          border border-white/10
                          backdrop-blur-lg
                          rounded-2xl
                          shadow-xl
                          transition
                          hover:border-zinc-400/40
                          hover:shadow-zinc-500/10">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm text-muted-foreground">
          จำนวนขวดที่ผลิต
        </CardTitle>
        <Factory className="h-12 w-12 text-primary" />
      </CardHeader>

      <CardContent>
        <p
          className="text-4xl font-bold tracking-wide text-cyan-500"
          style={{ fontFamily: "var(--font-digital)" }}
        >
          {value.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}