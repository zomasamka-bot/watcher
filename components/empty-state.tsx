import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";

export function EmptyState() {
  return (
    <Card className="border-dashed border-2 border-border/50">
      <CardContent className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Eye className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-center">{'No Action Loaded'}</h3>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          {'Enter a Reference ID or Action ID above to load and inspect financial action records from the Testnet'}
        </p>
      </CardContent>
    </Card>
  );
}
