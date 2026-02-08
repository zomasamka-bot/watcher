"use client";

import { useEffect, useState, useCallback } from "react";
import { getCoreEngine, type CoreState } from "@/lib/core-engine";

/**
 * React hook for Watcher Core Engine
 * Provides live state updates and action methods
 */
export function useCoreEngine() {
  const engine = getCoreEngine();
  const [state, setState] = useState<CoreState>(engine.getState());

  useEffect(() => {
    // Subscribe to engine state changes
    const unsubscribe = engine.subscribe((newState) => {
      setState(newState);
    });

    return unsubscribe;
  }, [engine]);

  const loadAction = useCallback(
    async (referenceId: string, piUsername?: string) => {
      return engine.loadAndVerifyAction(referenceId, piUsername);
    },
    [engine]
  );

  const reset = useCallback(() => {
    engine.reset();
  }, [engine]);

  const updateConfig = useCallback(
    (updates: Parameters<typeof engine.updateConfig>[0]) => {
      engine.updateConfig(updates);
    },
    [engine]
  );

  return {
    state,
    loadAction,
    reset,
    updateConfig,
    logs: state.logs,
  };
}
