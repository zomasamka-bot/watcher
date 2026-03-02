"use client";

import React from "react"

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ActionLoaderProps {
  onLoadAction: (referenceId: string) => void;
  isLoading: boolean;
}

const EXAMPLE_ACTIONS = [
  { id: "REF-2024-A7K", label: "Verification Check" },
  { id: "ACT-9X2-P4L", label: "Fund Transfer" },
  { id: "PAY-5M8-Q1N", label: "Payment Settlement" },
  { id: "ESC-3T6-R9W", label: "Escrow Hold" },
];

export function ActionLoader({ onLoadAction, isLoading }: ActionLoaderProps) {
  const [referenceId, setReferenceId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (referenceId.trim()) {
      onLoadAction(referenceId.trim());
    }
  };

  const handleExampleClick = (exampleId: string) => {
    setReferenceId(exampleId);
    onLoadAction(exampleId);
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">{'Load Financial Action'}</CardTitle>
        <CardDescription>
          {'Enter a Reference ID or Action ID to inspect existing records'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="REF-2024-XXX, ACT-XXX-XXX, PAY-XXX-XXX..."
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !referenceId.trim()}>
            <Search className="h-4 w-4 mr-2" />
            {'Load'}
          </Button>
        </form>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">{'Quick Examples (Testnet):'}</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_ACTIONS.map((example) => (
              <Button
                key={example.id}
                variant="outline"
                size="sm"
                onClick={() => handleExampleClick(example.id)}
                disabled={isLoading}
                className="text-xs"
              >
                {example.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
