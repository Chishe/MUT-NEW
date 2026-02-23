"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Power } from "lucide-react";

interface Props {
  machine?: { [key: string]: boolean };
}

const DEFAULT_STATUS = {
  Selector: false,
  Start: false,
  "In-V": false,
  "Wash-P": false,
  "Main M": false,
  "Out M": false,
  PM1: false,
  "IN-P": false,
  Cap: false,
  Airblow: false,
  "CC. Motor": false,
};

export default function MachineStatus({ machine }: Props) {
  const status = { ...DEFAULT_STATUS, ...machine };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Object.entries(status)
        // 🔥 ซ่อน key ที่ไม่ต้องการแสดง
        .filter(([key]) => !["Selector", "Start"].includes(key))
        .map(([key, value]) => (
          <Card
            key={key}
            className={`transition-all duration-300 hover:scale-[1.02] ${
              value
                ? "border-green-500 shadow-green-200"
                : "border-muted"
            }`}
          >
            <CardContent className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{key}</span>

                <Power
                  className={`h-4 w-4 transition ${
                    value
                      ? "text-green-500"
                      : "text-muted-foreground"
                  }`}
                />
              </div>

              <Badge
                className={`w-fit ${
                  value
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              >
                {value ? "ON" : "OFF"}
              </Badge>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}