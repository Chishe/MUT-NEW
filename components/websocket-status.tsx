"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Wifi } from "lucide-react";

interface Props {
  connected: boolean;
  dbConnected: boolean;
}

export default function WebsocketStatus({
  connected,
  dbConnected,
}: Props) {
  return (
    <Card className="rounded-2xl shadow-sm border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">
          System Status
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* WebSocket */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi
              className={`h-4 w-4 ${
                connected ? "text-green-500" : "text-red-500"
              }`}
            />
            <span className="text-sm font-medium">WebSocket</span>
          </div>

          <Badge
            variant={connected ? "default" : "destructive"}
            className="rounded-full px-3"
          >
            {connected ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        {/* Database */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database
              className={`h-4 w-4 ${
                dbConnected ? "text-green-500" : "text-red-500"
              }`}
            />
            <span className="text-sm font-medium">Database</span>
          </div>

          <Badge
            variant={dbConnected ? "default" : "destructive"}
            className="rounded-full px-3"
          >
            {dbConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}