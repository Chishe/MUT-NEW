"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Factory } from "lucide-react";

interface Props {
  value?: number;
}

export default function ProductionCard({ value = 0 }: Props) {
  return (
    <Card className="rounded-2xl shadow-sm border hover:shadow-md transition-all">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm text-muted-foreground">
          จำนวนขวดที่ผลิต
        </CardTitle>
        <Factory className="h-4 w-4 text-primary" />
      </CardHeader>

      <CardContent>
        <p
          className="text-4xl font-bold tracking-wide text-primary"
          style={{ fontFamily: "var(--font-digital)" }}
        >
          {value.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}