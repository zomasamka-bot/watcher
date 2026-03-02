"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Scale, ArrowUpRight } from "lucide-react";

interface ExpansionPanelProps {
  title: string;
  description: string;
  icon: "governance" | "risk" | "compliance";
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  comingSoon?: boolean;
}

export function ExpansionPanel({ title, description, icon, status, comingSoon = true }: ExpansionPanelProps) {
  const getIcon = () => {
    switch (icon) {
      case "governance":
        return <Scale className="h-5 w-5" />;
      case "risk":
        return <AlertTriangle className="h-5 w-5" />;
      case "compliance":
        return <Shield className="h-5 w-5" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "ACTIVE":
        return "bg-success/10 text-success border-success/20";
      case "INACTIVE":
        return "bg-muted text-muted-foreground border-border";
      case "PENDING":
        return "bg-warning/10 text-warning border-warning/20";
    }
  };

  return (
    <Card className={`relative overflow-hidden transition-all hover:shadow-md ${comingSoon ? 'opacity-70' : ''}`}>
      {comingSoon && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="outline" className="text-xs bg-background/80 backdrop-blur-sm">
            {'Coming Soon'}
          </Badge>
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getStatusColor()}`}>
              {getIcon()}
            </div>
            <div className="flex-1">
              <CardTitle className="text-base flex items-center gap-2">
                {title}
                {!comingSoon && <ArrowUpRight className="h-3 w-3" />}
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                {description}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{'Status'}</span>
          <Badge variant="outline" className={getStatusColor()}>
            {status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export function ExpansionInterface() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-1">{'Oversight Interfaces'}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {'Future expansion capabilities for institutional oversight and compliance verification'}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <ExpansionPanel
          title="Governance Interface"
          description="Multi-party approval workflows and governance protocols"
          icon="governance"
          status="ACTIVE"
          comingSoon={true}
        />
        <ExpansionPanel
          title="Risk Management"
          description="Real-time risk assessment and monitoring dashboards"
          icon="risk"
          status="ACTIVE"
          comingSoon={true}
        />
        <ExpansionPanel
          title="Compliance Verification"
          description="Automated compliance checks and audit trail management"
          icon="compliance"
          status="ACTIVE"
          comingSoon={true}
        />
      </div>
    </div>
  );
}
