"use client";

export default function BlueprintBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* Base Gradient */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-slate-100 via-slate-200 to-slate-300
          dark:from-[#0f172a] dark:via-[#0b1e3a] dark:to-[#0a2540]
        "
      />

      {/* Small Grid */}
      <div
        className="
          absolute inset-0
          opacity-40
          bg-[linear-gradient(rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.06)_1px,transparent_1px)]
          dark:bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
          bg-[size:25px_25px]
        "
      />

      {/* Large Grid */}
      <div
        className="
          absolute inset-0
          opacity-50
          bg-[linear-gradient(rgba(0,0,0,0.12)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.12)_2px,transparent_2px)]
          dark:bg-[linear-gradient(rgba(255,255,255,0.18)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.18)_2px,transparent_2px)]
          bg-[size:100px_100px]
        "
      />

      {/* Soft Glow */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)]
          dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_60%)]
        "
      />
    </div>
  );
}