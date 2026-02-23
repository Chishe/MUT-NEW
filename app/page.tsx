"use client";

import ProductionCard from "@/components/production-card";
import CounterCard from "@/components/counter-card";
import SpeedCard from "@/components/speed-card";
import MachineStatus from "@/components/machine-status";
import WebsocketStatus from "@/components/websocket-status";

import { SkeletonMachine } from "@/components/skeleton-machine";

import { useMachineSocket } from "@/hooks/use-machine-socket";
import { useDatabaseHealth } from "@/hooks/use-database-health";

export default function DashboardPage() {
  const { machineData, connected } = useMachineSocket();
  const { dbConnected } = useDatabaseHealth(5000);

  const isLoading = !machineData;

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl border bg-card p-6 shadow-sm animate-pulse"
              >
                <div className="h-4 w-32 bg-muted rounded mb-4" />
                <div className="h-10 w-24 bg-muted rounded" />
              </div>
            ))}
          </>
        ) : (
          <>
            <ProductionCard value={machineData?.value?.Counter} />
            <CounterCard value={machineData?.value?.Target} />
            <SpeedCard value={machineData?.value?.["Conv. Speed"]} />
            <WebsocketStatus connected={connected} dbConnected={dbConnected} />
          </>
        )}
      </div>

      {isLoading ? (
        <SkeletonMachine />
      ) : (
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <h1 className="text-lg font-semibold mb-6">Machine Status</h1>
          <MachineStatus machine={machineData?.machine} />
        </div>
      )}
    </div>
  );
}
