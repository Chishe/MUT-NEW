"use client";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  machine?: {
    Selector?: boolean;
    Start?: boolean;
  };
}

export default function ControlPanelCard({ machine }: Props) {
  const start = machine?.Start ?? false;
  const selector = machine?.Selector ?? false;

  return (
    <Card className="h-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-3xl shadow-2xl">
      <CardContent className="h-full flex flex-col items-center justify-center gap-16 py-12">
        {/* 🟢 START LAMP */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* glow */}
            <div
              className={`absolute w-full h-full rounded-full blur-3xl transition-all duration-500 ${
                start ? "bg-emerald-500/40" : "bg-emerald-400/10"
              }`}
            />

            {/* lamp */}
            <div
              className={`relative w-full h-full rounded-full border-[6px] transition-all duration-500 ${
                start
                  ? "bg-emerald-500 border-emerald-800 shadow-[0_0_70px_rgba(16,185,129,0.9)]"
                  : "bg-red-500 border-red-900 shadow-[0_0_25px_rgba(255,0,0,0.5)]"
              }`}
            >
              {/* inner highlight */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-40" />
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs tracking-widest text-muted-foreground">
              START LAMP
            </p>
            <p className="text-xl font-bold">{start ? "RUNNING" : "STOPPED"}</p>
          </div>
        </div>

        {/* 🟡 SELECTOR */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-44 h-44 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 border-[6px] border-yellow-700 flex items-center justify-center shadow-inner shadow-black/40 transition-all duration-500">
            {/* handle */}
            <div
              className={`absolute w-4 h-24 bg-black rounded-full shadow-lg transition-all duration-500 ${
                selector ? "rotate-45" : "-rotate-45"
              }`}
            />

            {/* center bolt */}
            <div className="absolute w-8 h-8 bg-zinc-800 rounded-full border-2 border-black" />
          </div>

          <div className="text-center">
            <p className="text-xs tracking-widest text-muted-foreground">
              SELECTOR SWITCH
            </p>
            <p className="text-xl font-bold">{selector ? "ON" : "OFF"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
