"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal } from "lucide-react";
import { useEffect, useRef } from "react";

interface LiveLogsProps {
  logs: string[];
  lastUpdated: string | null;
}

export function LiveLogs({ logs, lastUpdated }: LiveLogsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (logs.length === 0) return null;

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{'Live Execution Logs'}</CardTitle>
          </div>
          {lastUpdated && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground">{'Live'}</span>
            </div>
          )}
        </div>
        <CardDescription>{'Real-time action verification timeline'}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full rounded-md border border-border/50 bg-muted/30 p-4">
          <div ref={scrollRef} className="space-y-2 font-mono text-xs">
            {logs.map((log, index) => (
              <div
                key={index}
                className="text-foreground/80 leading-relaxed animate-in fade-in duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {log}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
