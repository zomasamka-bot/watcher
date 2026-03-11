"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [amountInput, setAmountInput] = useState("");

  const parsedAmount = parseFloat(amountInput);
  const isValidAmount = !isNaN(parsedAmount) && parsedAmount > 0;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow digits and a single decimal point only
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmountInput(value);
      setPaymentStatus("idle");
      setPaymentMessage("");
    }
  };

  const handlePayment = async () => {
    if (!isAuthenticated || typeof window.pay !== "function") {
      setPaymentStatus("error");
      setPaymentMessage("Payment system not initialized. Please ensure you are using Pi Browser.");
      return;
    }

    if (!isValidAmount) {
      setPaymentStatus("error");
      setPaymentMessage("Please enter a valid Pi amount greater than 0.");
      return;
    }

    setIsProcessing(true);
    setPaymentStatus("idle");
    setPaymentMessage("");

    try {
      await window.pay({
        amount: parsedAmount,
        memo: `Watcher - Testnet Payment (${parsedAmount} Pi)`,
        metadata: {
          test: true,
          purpose: "testnet_verification",
          app: "watcher.pi",
          amount: parsedAmount,
          timestamp: new Date().toISOString(),
        },
        onComplete: (_metadata) => {
          setPaymentStatus("success");
          setPaymentMessage(
            `Payment of ${parsedAmount} Pi completed successfully. Transaction confirmed on Testnet.`
          );
          setAmountInput("");
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
              Pi Wallet Integration
            </CardTitle>
            <CardDescription>
              Authenticate and verify Pi Wallet connectivity on Testnet
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

            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="pi-amount">Amount (Pi)</Label>
                <div className="relative">
                  <Input
                    id="pi-amount"
                    type="text"
                    inputMode="decimal"
                    placeholder="e.g. 0.01"
                    value={amountInput}
                    onChange={handleAmountChange}
                    disabled={isProcessing}
                    className="pr-12 font-mono"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground pointer-events-none">
                    Pi
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter any positive Pi amount to send on Testnet
                </p>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isProcessing || !isValidAmount}
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
                    {isValidAmount
                      ? `Send ${parsedAmount} Pi`
                      : "Send Payment"}
                  </>
                )}
              </Button>
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
