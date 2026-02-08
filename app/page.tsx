"use client";

import { ActionLoader } from "@/components/action-loader";
import { ActionDetails } from "@/components/action-details";
import { EmptyState } from "@/components/empty-state";
import { LiveLogs } from "@/components/live-logs";
import { ExpansionInterfaces } from "@/components/expansion-interfaces";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, AlertCircle, Activity, Lock } from "lucide-react";
import { useWatcherEngine } from "@/hooks/use-watcher-engine";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { Badge } from "@/components/ui/badge";
import { getAppBranding } from "@/lib/domain-config";

export default function HomePage() {
  const { action, isLoading, error, logs, lastUpdated, status, loadAction } = useWatcherEngine();
  const { userData } = usePiAuth();
  const branding = getAppBranding();

  const handleLoadAction = async (referenceId: string) => {
    await loadAction(referenceId, userData?.username);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card sticky top-0 z-10 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Eye className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">{branding.name}</h1>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {branding.domain}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{branding.tagline}</p>
              </div>
            </div>
            {status !== "Idle" && (
              <Badge variant={status === "Failed" ? "destructive" : "secondary"} className="flex items-center gap-1.5">
                <Activity className="h-3 w-3" />
                {status}
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-balance">{'Load & Verify Financial Actions'}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {'Experience and verify financial actions on Testnet. View action flows, reference IDs, statuses, timestamps, and execution evidence with full oversight transparency.'}
            </p>
          </div>

          <ActionLoader onLoadAction={handleLoadAction} isLoading={isLoading} />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">{'Loading action data...'}</p>
              </div>
            </div>
          )}

          {!isLoading && !action && !error && <EmptyState />}

          {!isLoading && action && (
            <>
              <LiveLogs logs={logs} lastUpdated={lastUpdated} />
              <ActionDetails action={action} />
            </>
          )}

          {logs.length > 0 && !action && <LiveLogs logs={logs} lastUpdated={lastUpdated} />}

          {!action && !isLoading && (
            <div className="mt-8">
              <ExpansionInterfaces />
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-border/50 mt-12 bg-card/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3 w-3" />
                {'Read-only oversight'}
              </span>
              <span className="hidden sm:inline">{'•'}</span>
              <span>{'No financial actions permitted'}</span>
              <span className="hidden sm:inline">{'•'}</span>
              <span>{'Testnet Only'}</span>
            </div>
            <p className="text-xs text-muted-foreground/80">
              {branding.footer}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
