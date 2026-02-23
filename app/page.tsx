"use client";

import ProductionCard from "@/components/production-card";
import CounterCard from "@/components/counter-card";
import SpeedCard from "@/components/speed-card";
import MachineStatus from "@/components/machine-status";
import WebsocketStatus from "@/components/websocket-status";

import { SkeletonMachine } from "@/components/skeleton-machine";
import ControlPanelCard from "@/components/control-panel-card";
import { useMachineSocket } from "@/hooks/use-machine-socket";
import { useDatabaseHealth } from "@/hooks/use-database-health";

export default function DashboardPage() {
  const { machineData, connected } = useMachineSocket();
  const { dbConnected } = useDatabaseHealth(5000);

  const isLoading = !machineData;

  return (
    <div className="h-full w-full flex items-center justify-center ">
      <div className="container-2 w-full max-w-7xl p-6 space-y-6">
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
              <SpeedCard value={machineData?.value?.["Conv. Speed"]} />
              <ProductionCard value={machineData?.value?.Counter} />
              <CounterCard value={machineData?.value?.Target} />
              <WebsocketStatus
                connected={connected}
                dbConnected={dbConnected}
              />
            </>
          )}
        </div>

        {isLoading ? (
          <SkeletonMachine />
        ) : (
          <div className="h-full">
            <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {/* ซ้าย */}
              <div className="md:col-span-1 h-full flex flex-col gap-6">
                <ControlPanelCard machine={machineData?.machine} />
              </div>

              {/* ขวา */}
              <div className="md:col-span-2 p-6 bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl transition hover:border-zinc-400/40 hover:shadow-zinc-500/10">
                <h1 className="text-lg font-semibold mb-6">Output Status</h1>
                <MachineStatus machine={machineData?.machine} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
