"use client";

/**
 * WATCHER CORE ENGINE
 * Unified state management and action processing engine
 * Single source of truth for all action verification state
 */

export type ActionStatus = "Fetched" | "Verified" | "Displayed" | "Failed";

export type ActionType = 
  | "VERIFICATION_CHECK"
  | "FUND_TRANSFER"
  | "PAYMENT_SETTLEMENT"
  | "ESCROW_HOLD"
  | "CONTRACT_EXECUTION";

export interface EvidenceHooks {
  governance: string;
  risk: string;
  compliance: string;
}

export interface ActionEvidence {
  log: string;
  snapshot: string;
  freezeId: string;
  releaseId: string;
  hooks: EvidenceHooks;
  verificationDomain: string; // watcher.pi - domain performing verification
  verificationTimestamp: string; // When watcher.pi verified this action
}

export interface ActionData {
  referenceId: string;
  actionId: string;
  type: ActionType;
  status: ActionStatus;
  timestamp: string;
  evidence: ActionEvidence;
  executedBy?: string; // Masked Pi username
  originApp?: string; // Origin of the action being verified
  verifiedBy: string; // Domain that performed the verification (watcher.pi)
}

export interface ActionConfig {
  allowedReferenceFormats: RegExp[];
  maxRetries: number;
  timeoutMs: number;
  autoRefreshInterval?: number;
}

export interface CoreEngineState {
  action: ActionData | null;
  status: ActionStatus | "Idle";
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
  logs: string[];
}

export class WatcherCoreEngine {
  private state: CoreEngineState;
  private config: ActionConfig;
  private listeners: Set<(state: CoreEngineState) => void>;
  private refreshTimer: NodeJS.Timeout | null = null;
  private broadcastChannel: BroadcastChannel | null = null;
  private readonly STORAGE_KEY = "watcher_state";
  private readonly CHANNEL_NAME = "watcher_sync";

  constructor(config: ActionConfig) {
    this.config = config;
    this.state = {
      action: null,
      status: "Idle",
      isLoading: false,
      error: null,
      lastUpdated: null,
      logs: [],
    };
    this.listeners = new Set();
    this.initializeCrossTabSync();
  }

  /**
   * Initialize cross-tab synchronization
   * Uses BroadcastChannel for real-time sync and localStorage for persistence
   */
  private initializeCrossTabSync(): void {
    if (typeof window === "undefined") return;

    // Initialize BroadcastChannel for cross-tab communication
    try {
      this.broadcastChannel = new BroadcastChannel(this.CHANNEL_NAME);
      
      this.broadcastChannel.onmessage = (event) => {
        if (event.data?.type === "STATE_UPDATE") {
          // Update local state from other tabs
          this.state = event.data.state;
          this.notifyListeners();
        }
      };
    } catch (err) {
      console.error("BroadcastChannel not supported:", err);
    }

    // Load persisted state from localStorage
    this.loadPersistedState();

    // Listen to storage events from other tabs
    window.addEventListener("storage", this.handleStorageChange);
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: (state: CoreEngineState) => void): () => void {
    this.listeners.add(listener);
    listener(this.state); // Immediately call with current state
    
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Get current state (immutable copy)
   */
  getState(): Readonly<CoreEngineState> {
    return { ...this.state };
  }

  /**
   * Load persisted state from localStorage
   */
  private loadPersistedState(): void {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const persistedState = JSON.parse(stored) as CoreEngineState;
        this.state = persistedState;
        this.notifyListeners();
      }
    } catch (err) {
      console.error("Failed to load persisted state:", err);
    }
  }

  /**
   * Save state to localStorage for persistence
   */
  private persistState(): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (err) {
      console.error("Failed to persist state:", err);
    }
  }

  /**
   * Broadcast state changes to other tabs
   */
  private broadcastStateChange(): void {
    if (!this.broadcastChannel) return;

    try {
      this.broadcastChannel.postMessage({
        type: "STATE_UPDATE",
        state: this.state,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Failed to broadcast state:", err);
    }
  }

  /**
   * Handle storage changes from other tabs
   */
  private handleStorageChange = (event: StorageEvent): void => {
    if (event.key === this.STORAGE_KEY && event.newValue) {
      try {
        const newState = JSON.parse(event.newValue) as CoreEngineState;
        this.state = newState;
        this.notifyListeners();
      } catch (err) {
        console.error("Failed to parse storage change:", err);
      }
    }
  };

  /**
   * Notify all listeners of state changes
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      try {
        listener(this.state);
      } catch (err) {
        console.error("Listener error:", err);
      }
    });
  }

  /**
   * Update state and notify all listeners
   * Includes cross-tab synchronization
   */
  private updateState(updates: Partial<CoreEngineState>): void {
    this.state = {
      ...this.state,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    
    // Persist state to localStorage
    this.persistState();
    
    // Broadcast to other tabs
    this.broadcastStateChange();
    
    // Notify local listeners
    this.notifyListeners();
  }

  /**
   * Add log entry with timestamp
   */
  private addLog(message: string): void {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}`;
    
    this.updateState({
      logs: [...this.state.logs, logEntry],
    });
  }

  /**
   * Validate reference ID format
   */
  private validateReferenceId(referenceId: string): boolean {
    return this.config.allowedReferenceFormats.some((regex) =>
      regex.test(referenceId)
    );
  }

  /**
   * Generate evidence pack for action
   * Includes watcher.pi domain identity in evidence manifest
   */
  private generateEvidence(referenceId: string): ActionEvidence {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7).toUpperCase();
    const verificationTimestamp = new Date().toISOString();
    
    return {
      log: `LOG-${timestamp}-${random}`,
      snapshot: `SNAP-${timestamp}-${random}`,
      freezeId: `FRZ-${timestamp}-${random}`,
      releaseId: `REL-${timestamp}-${random}`,
      hooks: {
        governance: "HOOK-GOV-ACTIVE",
        risk: "HOOK-RISK-ACTIVE",
        compliance: "HOOK-COMP-ACTIVE",
      },
      verificationDomain: "watcher.pi", // Official domain identity
      verificationTimestamp, // When watcher.pi verified this record
    };
  }

  /**
   * Mask Pi username for privacy
   */
  private maskUsername(username: string): string {
    if (username.length <= 4) return "****";
    const visibleChars = Math.min(3, Math.floor(username.length / 3));
    const prefix = username.substring(0, visibleChars);
    const suffix = username.substring(username.length - 2);
    return `${prefix}***${suffix}`;
  }

  /**
   * Simulate fetching action from external source
   * In production, this would call actual APIs
   */
  private async fetchActionData(
    referenceId: string,
    piUsername?: string
  ): Promise<ActionData> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate random action types based on reference prefix
    const actionTypes: Record<string, ActionType> = {
      REF: "VERIFICATION_CHECK",
      ACT: "FUND_TRANSFER",
      PAY: "PAYMENT_SETTLEMENT",
      ESC: "ESCROW_HOLD",
      CTR: "CONTRACT_EXECUTION",
    };

    const prefix = referenceId.split("-")[0] as keyof typeof actionTypes;
    const type = actionTypes[prefix] || "VERIFICATION_CHECK";

    const timestamp = new Date().toISOString();
    const actionId = referenceId.startsWith("REF")
      ? `ACT-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`
      : referenceId;

    const evidence = this.generateEvidence(referenceId);

    return {
      referenceId,
      actionId,
      type,
      status: "Verified",
      timestamp,
      evidence,
      executedBy: piUsername ? this.maskUsername(piUsername) : undefined,
      originApp: "testnet.pi", // Origin of the action being verified
      verifiedBy: "watcher.pi", // Official domain that performed verification
    };
  }

  /**
   * Load and verify an action by reference ID
   * Main entry point for action verification
   */
  async loadAction(referenceId: string, piUsername?: string): Promise<void> {
    // Clear previous state
    this.updateState({
      isLoading: true,
      error: null,
      action: null,
      status: "Idle",
    });

    this.addLog(`Initiating action load for: ${referenceId}`);

    try {
      // Validate reference ID format
      if (!this.validateReferenceId(referenceId)) {
        throw new Error(
          "Invalid Reference ID format. Expected formats: REF-XXXX-XXX, ACT-XXX-XXX, PAY-XXX-XXX, ESC-XXX-XXX, CTR-XXX-XXX"
        );
      }

      this.addLog("Reference ID validated");

      // Update status to Fetched
      this.updateState({ status: "Fetched" });
      this.addLog("Status: Fetched - Retrieving action data");

      // Fetch action data
      const actionData = await this.fetchActionData(referenceId, piUsername);

      // Update status to Verified
      this.updateState({ status: "Verified" });
      this.addLog("Status: Verified - Action data retrieved and validated");

      // Update state with action data
      this.updateState({
        action: actionData,
        status: "Displayed",
        isLoading: false,
      });
      
      this.addLog("Status: Displayed - Action ready for oversight");
      this.addLog(`Evidence pack generated: ${actionData.evidence.log}`);

      // Start auto-refresh if configured
      if (this.config.autoRefreshInterval) {
        this.startAutoRefresh(referenceId, piUsername);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";

      this.updateState({
        status: "Failed",
        error: errorMessage,
        isLoading: false,
        action: null,
      });

      this.addLog(`Status: Failed - ${errorMessage}`);
    }
  }

  /**
   * Start auto-refresh for live updates
   */
  private startAutoRefresh(referenceId: string, piUsername?: string): void {
    this.stopAutoRefresh();

    if (!this.config.autoRefreshInterval) return;

    this.refreshTimer = setInterval(() => {
      if (this.state.action) {
        this.addLog("Auto-refresh: Checking for updates");
        // In production, this would check for real updates
        // For now, just update timestamp
        const updatedAction = {
          ...this.state.action,
          timestamp: new Date().toISOString(),
        };
        this.updateState({ action: updatedAction });
      }
    }, this.config.autoRefreshInterval);
  }

  /**
   * Stop auto-refresh
   */
  stopAutoRefresh(): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  /**
   * Clear current action and reset state
   */
  clear(): void {
    this.stopAutoRefresh();
    this.updateState({
      action: null,
      status: "Idle",
      isLoading: false,
      error: null,
      logs: [],
    });
    this.addLog("Engine reset");
  }

  /**
   * Cleanup and destroy engine
   */
  destroy(): void {
    this.stopAutoRefresh();
    this.listeners.clear();
    
    // Clean up cross-tab sync
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
      this.broadcastChannel = null;
    }
    
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", this.handleStorageChange);
    }
  }
}

/**
 * Default action configuration for Watcher
 */
export const DEFAULT_ACTION_CONFIG: ActionConfig = {
  allowedReferenceFormats: [
    /^REF-\d{4}-[A-Z0-9]+$/,
    /^ACT-[A-Z0-9]+-[A-Z0-9]+$/,
    /^PAY-[A-Z0-9]+-[A-Z0-9]+$/,
    /^ESC-[A-Z0-9]+-[A-Z0-9]+$/,
    /^CTR-[A-Z0-9]+-[A-Z0-9]+$/,
  ],
  maxRetries: 3,
  timeoutMs: 10000,
  autoRefreshInterval: 30000, // 30 seconds
};

/**
 * Singleton instance of the Core Engine
 */
let engineInstance: WatcherCoreEngine | null = null;

/**
 * Get or create the singleton Core Engine instance
 * Ensures only one engine instance exists across the application
 */
export function getCoreEngine(): WatcherCoreEngine {
  if (!engineInstance) {
    engineInstance = new WatcherCoreEngine(DEFAULT_ACTION_CONFIG);
  }
  return engineInstance;
}
