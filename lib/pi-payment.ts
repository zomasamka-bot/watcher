/**
 * Pi Network Payment Integration
 *
 * Handles the full Pi payment lifecycle:
 *   1. Client calls window.pay()
 *   2. Pi SDK triggers onReadyForServerApproval → POST /api/payment/approve/[id]
 *   3. Pi SDK triggers onReadyForServerCompletion → POST /api/payment/complete/[id]
 *   4. onComplete callback is called with the payment metadata
 *
 * All server calls use the real Pi Platform API via local Next.js route handlers.
 * No simulation, no mock data.
 */

// Always use the absolute production URL so Pi Browser's iframe context
// resolves the approve/complete callbacks correctly regardless of origin.
const BACKEND_BASE =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://watcher-vb-vyqg2-kx-sa-vh.vercel.app";

// ============================================================================
// Types
// ============================================================================

export type PaymentMetadata = Record<string, unknown>;

export type PaymentOptions = {
  amount: number;
  memo?: string;
  metadata: PaymentMetadata;
  onComplete?: (metadata: PaymentMetadata) => void;
  onError?: (error: Error, payment?: PiPayment) => void;
};

export type PiPaymentData = {
  amount: number;
  memo: string;
  metadata: PaymentMetadata;
};

export type PiPaymentCallbacks = {
  onReadyForServerApproval: (paymentId: string) => void;
  onReadyForServerCompletion: (paymentId: string, txid: string) => void;
  onCancel: (paymentId: string) => void;
  onError: (error: Error, payment?: PiPayment) => void;
};

export type PiPayment = {
  identifier: string;
  amount: number;
  metadata: PaymentMetadata;
  transaction: { txid: string };
};

// ============================================================================
// Global window types
// ============================================================================

declare global {
  interface Window {
    Pi: {
      init: (config: { version: string; sandbox?: boolean }) => Promise<void>;
      authenticate: (
        scopes: string[],
        onIncompletePaymentFound: (payment: PiPayment) => Promise<void>
      ) => Promise<{ accessToken: string; user: { uid: string; username: string } }>;
      createPayment: (
        paymentData: PiPaymentData,
        callbacks: PiPaymentCallbacks
      ) => void;
    };
    pay: (options: PaymentOptions) => Promise<void>;
  }
}

// ============================================================================
// Core payment function
// ============================================================================

export const pay = async (options: PaymentOptions): Promise<void> => {
  if (typeof window === "undefined" || typeof window.Pi === "undefined") {
    throw new Error("Pi SDK is not available. Open this app inside Pi Browser.");
  }

  const paymentData: PiPaymentData = {
    amount: options.amount,
    memo: options.memo ?? `Watcher payment – ${options.amount} Pi`,
    metadata: options.metadata,
  };

  const callbacks: PiPaymentCallbacks = {
    /**
     * Step 1: Pi SDK is ready for server approval.
     * We must call our backend which forwards to Pi Platform API.
     * The payment dialog remains open until this completes.
     */
    onReadyForServerApproval: async (paymentId: string) => {
      try {
        const res = await fetch(
          `${BACKEND_BASE}/api/payment/approve/${paymentId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) {
          const detail = await res.json().catch(() => ({}));
          throw new Error(detail?.error ?? `Approval failed (${res.status})`);
        }
      } catch (error) {
        if (options.onError) {
          options.onError(
            error instanceof Error ? error : new Error("Approval failed"),
          );
        }
      }
    },

    /**
     * Step 2: Pi SDK has the txid from the blockchain.
     * We call our backend to complete the payment on Pi Platform.
     * The txid here is the real on-chain transaction ID from Pi SDK.
     */
    onReadyForServerCompletion: async (paymentId: string, txid: string) => {
      try {
        const res = await fetch(
          `${BACKEND_BASE}/api/payment/complete/${paymentId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ txid }),
          }
        );
        if (!res.ok) {
          const detail = await res.json().catch(() => ({}));
          throw new Error(detail?.error ?? `Completion failed (${res.status})`);
        }

        if (options.onComplete) {
          options.onComplete(options.metadata);
        }
      } catch (error) {
        if (options.onError) {
          options.onError(
            error instanceof Error ? error : new Error("Completion failed"),
          );
        }
      }
    },

    onCancel: (_paymentId: string) => {
      if (options.onError) {
        options.onError(new Error("Payment was cancelled by the user."));
      }
    },

    onError: (error: Error, payment?: PiPayment) => {
      if (options.onError) {
        options.onError(error, payment);
      }
    },
  };

  window.Pi.createPayment(paymentData, callbacks);
};

// ============================================================================
// Incomplete payment recovery
// Called during Pi.authenticate() if a previous payment was not completed
// ============================================================================

export const checkIncompletePayments = async (payment: PiPayment): Promise<void> => {
  if (!payment?.transaction?.txid) return;

  try {
    await fetch(`${BACKEND_BASE}/api/payment/complete/${payment.identifier}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ txid: payment.transaction.txid }),
    });
  } catch {
    // Non-fatal — log silently and continue authentication
  }
};

// ============================================================================
// Register window.pay globally after auth
// ============================================================================

export const initializeGlobalPayment = (): void => {
  if (typeof window !== "undefined") {
    window.pay = pay;
  }
};
