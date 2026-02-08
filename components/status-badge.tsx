import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";

type ActionStatus = "Fetched" | "Verified" | "Displayed" | "Failed";

interface StatusBadgeProps {
  status: ActionStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    Fetched: {
      icon: Clock,
      className: "bg-info/10 text-info border-info/20",
      label: "Fetched"
    },
    Verified: {
      icon: CheckCircle2,
      className: "bg-success/10 text-success border-success/20",
      label: "Verified"
    },
    Displayed: {
      icon: CheckCircle2,
      className: "bg-success/10 text-success border-success/20",
      label: "Displayed"
    },
    Failed: {
      icon: XCircle,
      className: "bg-destructive/10 text-destructive border-destructive/20",
      label: "Failed"
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`${config.className} ${className || ""}`}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
}
