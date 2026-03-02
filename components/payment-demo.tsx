"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wallet, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { WalletConnectButton } from "./wallet-connect-button";

export function PaymentDemo() {
  const { userData, isAuthenticated } = usePiAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle");
  const [paymentMessage, setPaymentMessage] = useState("");

  const handleTestPayment = async () => {
    if (!isAuthenticated || typeof window.pay !== "function") {
      setPaymentStatus("error");
      setPaymentMessage("Payment system not initialized. Please refresh the page.");
      return;
    }

    setIsProcessing(true);
    setPaymentStatus("idle");
    setPaymentMessage("");

    try {
      await window.pay({
        amount: 0.01,
        memo: "Watcher App - Step 10 Test Payment",
        metadata: {
          test: true,
          purpose: "step10_verification",
          app: "watcher.pi",
          timestamp: new Date().toISOString(),
        },
        onComplete: (metadata) => {
          setPaymentStatus("success");
          setPaymentMessage("Test payment completed successfully! Step 10 verification ready.");
          setIsProcessing(false);
        },
        onError: (error) => {
          setPaymentStatus("error");
          setPaymentMessage(`Payment failed: ${error.message}`);
          setIsProcessing(false);
        },
      });
    } catch (error) {
      setPaymentStatus("error");
      setPaymentMessage(
        error instanceof Error ? error.message : "Payment failed. Please try again."
      );
      setIsProcessing(false);
    }
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              Step 10 - Pi Wallet Connection
            </CardTitle>
            <CardDescription>
              Connect your Pi Wallet for Developer Portal verification
            </CardDescription>
          </div>
          <Badge variant="outline" className="font-mono">
            Testnet
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <WalletConnectButton />

        {isAuthenticated && (
          <>
            <div className="flex items-center justify-between p-3 rounded-lg bg-card border">
              <div>
                <p className="text-sm font-medium">Connected User</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {userData?.username || "Anonymous"}
                </p>
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Wallet Connected
              </Badge>
            </div>

            <div className="space-y-2">
              <Button
                onClick={handleTestPayment}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Wallet className="h-4 w-4 mr-2" />
                    Test Payment (0.01 Pi)
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                This test payment demonstrates Pi Wallet integration for Step 10 verification
              </p>
            </div>

            {paymentStatus === "success" && (
              <Alert className="bg-success/10 border-success/20">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <AlertDescription className="text-success">
                  {paymentMessage}
                </AlertDescription>
              </Alert>
            )}

            {paymentStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{paymentMessage}</AlertDescription>
              </Alert>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
