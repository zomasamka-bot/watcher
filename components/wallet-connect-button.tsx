"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wallet, Loader2, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";

type ConnectionStatus = "checking" | "ready" | "connecting" | "connected" | "error";

export function WalletConnectButton() {
  const { isAuthenticated, userData, reinitialize, hasError, authMessage } = usePiAuth();
  const [status, setStatus] = useState<ConnectionStatus>("checking");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPiReady, setIsPiReady] = useState(false);

  useEffect(() => {
    // Check if Pi SDK is loaded and ready
    const checkPiSDK = () => {
      if (typeof window !== "undefined" && typeof window.Pi !== "undefined") {
        setIsPiReady(true);
        setStatus("ready");
      } else {
        setTimeout(checkPiSDK, 100);
      }
    };

    checkPiSDK();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setStatus("connected");
      setErrorMessage("");
    } else if (hasError) {
      setStatus("error");
      setErrorMessage(authMessage);
    } else if (authMessage.includes("Authenticating") || authMessage.includes("Logging in")) {
      setStatus("connecting");
    }
  }, [isAuthenticated, hasError, authMessage]);

  const handleConnect = async () => {
    if (!isPiReady) {
      setStatus("error");
      setErrorMessage("Pi SDK is not loaded. Please ensure you're using Pi Browser.");
      return;
    }

    setStatus("connecting");
    setErrorMessage("");

    try {
      await reinitialize();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Connection failed");
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case "checking":
        return (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Initializing SDK...
          </>
        );
      case "connecting":
        return (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Connecting to Pi Wallet...
          </>
        );
      case "connected":
        return (
          <>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Connected: {userData?.username || "User"}
          </>
        );
      case "error":
        return (
          <>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Connection
          </>
        );
      default:
        return (
          <>
            <Wallet className="h-4 w-4 mr-2" />
            Connect Pi Wallet
          </>
        );
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "connected":
        return (
          <Badge variant="default" className="bg-success text-success-foreground">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        );
      case "connecting":
        return (
          <Badge variant="secondary">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Connecting
          </Badge>
        );
      case "error":
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      case "checking":
        return (
          <Badge variant="secondary">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Initializing
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Ready
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Button
          onClick={handleConnect}
          disabled={status === "checking" || status === "connecting" || status === "connected" || !isPiReady}
          size="lg"
          className="flex-1"
          variant={status === "connected" ? "secondary" : "default"}
        >
          {getButtonContent()}
        </Button>
        {getStatusBadge()}
      </div>

      {status === "connecting" && (
        <Alert>
          <Loader2 className="h-4 w-4 animate-spin" />
          <AlertDescription>
            {authMessage || "Connecting to Pi Network..."}
          </AlertDescription>
        </Alert>
      )}

      {status === "connected" && userData && (
        <Alert className="bg-success/10 border-success/20">
          <CheckCircle2 className="h-4 w-4 text-success" />
          <AlertDescription className="text-success">
            Successfully connected to Pi Wallet with payments scope enabled
          </AlertDescription>
        </Alert>
      )}

      {status === "error" && errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}

      {!isPiReady && status === "checking" && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Waiting for Pi SDK to load... Make sure you're using Pi Browser.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
