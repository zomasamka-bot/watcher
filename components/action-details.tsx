"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./status-badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Hash, 
  Clock, 
  Shield, 
  AlertTriangle, 
  FileCheck,
  Link as LinkIcon,
  Archive
} from "lucide-react";

import type { ActionData } from "@/lib/core-engine";

export type { ActionData };

interface ActionDetailsProps {
  action: ActionData;
}

export function ActionDetails({ action }: ActionDetailsProps) {
  return (
    <div className="space-y-4">
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {'Action Details'}
              </CardTitle>
              <CardDescription>{'Financial action record on Testnet'}</CardDescription>
            </div>
            <StatusBadge status={action.status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Hash className="h-3 w-3" />
                {'Reference ID'}
              </div>
              <p className="text-sm font-mono font-medium break-all">{action.referenceId}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Hash className="h-3 w-3" />
                {'Action ID'}
              </div>
              <p className="text-sm font-mono font-medium break-all">{action.actionId}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FileCheck className="h-3 w-3" />
                {'Action Type'}
              </div>
              <Badge variant="secondary" className="font-mono">
                {action.type}
              </Badge>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {'Timestamp'}
              </div>
              <p className="text-sm font-medium">
                {new Date(action.timestamp).toLocaleString()}
              </p>
            </div>

            {action.executedBy && (
              <div className="space-y-1 col-span-full">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  {'Executed By (Masked)'}
                </div>
                <p className="text-sm font-mono font-medium">{action.executedBy}</p>
              </div>
            )}

            {action.originApp && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FileCheck className="h-3 w-3" />
                  {'Origin App'}
                </div>
                <p className="text-sm font-medium">{action.originApp}</p>
              </div>
            )}

            <div className="space-y-1 col-span-full">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3 text-primary" />
                {'Verified By'}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default" className="font-mono text-xs">
                  {action.verifiedBy}
                </Badge>
                <span className="text-xs text-muted-foreground">{'Official oversight domain'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Archive className="h-5 w-5 text-primary" />
            {'Execution Evidence'}
          </CardTitle>
          <CardDescription>{'Auto-generated verification manifest'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <FileText className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
              <div className="space-y-1 flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">{'Execution Log'}</p>
                <p className="text-sm font-mono break-all">{action.evidence.log}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <LinkIcon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
              <div className="space-y-1 flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">{'Snapshot Reference'}</p>
                <p className="text-sm font-mono break-all">{action.evidence.snapshot}</p>
              </div>
            </div>

            {action.evidence.freezeId && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Archive className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="space-y-1 flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{'Freeze ID'}</p>
                  <p className="text-sm font-mono break-all">{action.evidence.freezeId}</p>
                </div>
              </div>
            )}

            {action.evidence.releaseId && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Archive className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="space-y-1 flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{'Release ID'}</p>
                  <p className="text-sm font-mono break-all">{action.evidence.releaseId}</p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{'Verification Authority'}</p>
                <p className="text-xs text-muted-foreground">
                  {'Official oversight domain that verified this record'}
                </p>
              </div>
            </div>
            <Badge variant="default" className="font-mono">
              {action.evidence.verificationDomain}
            </Badge>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            {'Verified at: '}{new Date(action.evidence.verificationTimestamp).toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">{'Oversight Hooks'}</CardTitle>
          <CardDescription>{'Three-hook verification manifest (UI only)'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">{'Governance'}</p>
                  <p className="text-xs text-muted-foreground font-mono">{action.evidence.hooks.governance}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
                {'Active'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <div>
                  <p className="text-sm font-medium">{'Risk'}</p>
                  <p className="text-xs text-muted-foreground font-mono">{action.evidence.hooks.risk}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
                {'Active'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <FileCheck className="h-4 w-4 text-accent" />
                <div>
                  <p className="text-sm font-medium">{'Compliance'}</p>
                  <p className="text-xs text-muted-foreground font-mono">{action.evidence.hooks.compliance}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
                {'Active'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
