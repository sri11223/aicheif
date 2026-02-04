"use client";

import { useEffect, useState } from "react";

export const useCurrentTime = () => {
  const [timestamp, setTimestamp] = useState<string>(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return timestamp;
};
