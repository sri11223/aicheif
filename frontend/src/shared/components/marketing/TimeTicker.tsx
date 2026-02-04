"use client";

import React from "react";
import { useCurrentTime } from "../../hooks/useCurrentTime";

export const TimeTicker: React.FC = () => {
  const time = useCurrentTime();
  return (
    <div className="marketing-ticker">
      <span className="pill neutral">Live</span>
      <span>System sync: {time}</span>
    </div>
  );
};
