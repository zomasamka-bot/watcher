"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, FileCheck, Lock } from "lucide-react";

export function ExpansionInterfaces() {
  return (
    <Card className="border-border/50 border-dashed">
      <CardHeader>
        <CardTitle className="text-lg">{'Expansion Interfaces'}</CardTitle>
        <CardDescription>
          {'Future oversight modules prepared for institutional integration'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex flex-col items-center p-4 rounded-lg bg-muted/30 border border-border/50">
            <Shield className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-1">{'Governance'}</p>
            <Badge variant="secondary" className="text-xs">{'Reserved'}</Badge>
          </div>

          <div className="flex flex-col items-center p-4 rounded-lg bg-muted/30 border border-border/50">
            <AlertTriangle className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-1">{'Risk Management'}</p>
            <Badge variant="secondary" className="text-xs">{'Reserved'}</Badge>
          </div>

          <div className="flex flex-col items-center p-4 rounded-lg bg-muted/30 border border-border/50">
            <FileCheck className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-1">{'Compliance'}</p>
            <Badge variant="secondary" className="text-xs">{'Reserved'}</Badge>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border/50 flex items-start gap-3">
          <Lock className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            {'These interfaces are prepared for future expansion to support institutional oversight, regulatory compliance, and risk assessment modules. Currently in read-only demonstration mode.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
