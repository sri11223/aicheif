"use client";

import { useEffect } from "react";

export const usePolling = (callback: () => void, intervalMs: number) => {
  useEffect(() => {
    const interval = window.setInterval(callback, intervalMs);
    return () => window.clearInterval(interval);
  }, [callback, intervalMs]);
};
