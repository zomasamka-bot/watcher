"use client";

import { useState, useEffect } from "react";
import {
  getCoreEngine,
  type CoreEngineState,
} from "@/lib/core-engine";

/**
 * React hook for Watcher Core Engine
 * Uses singleton pattern for unified state management across the app
 * Provides live updates through observer pattern
 */
export function useWatcherEngine() {
  const [state, setState] = useState<CoreEngineState>({
    action: null,
    status: "Idle",
    isLoading: false,
    error: null,
    lastUpdated: null,
    logs: [],
  });

  // Subscribe to engine updates on mount
  useEffect(() => {
    const engine = getCoreEngine();

    // Subscribe to state changes
    const unsubscribe = engine.subscribe((newState) => {
      setState(newState);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // API methods using singleton engine
  const loadAction = async (referenceId: string, piUsername?: string) => {
    const engine = getCoreEngine();
    await engine.loadAction(referenceId, piUsername);
  };

  const clear = () => {
    const engine = getCoreEngine();
    engine.clear();
  };

  const stopAutoRefresh = () => {
    const engine = getCoreEngine();
    engine.stopAutoRefresh();
  };

  return {
    ...state,
    loadAction,
    clear,
    stopAutoRefresh,
  };
}
