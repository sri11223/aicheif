import React from "react";
import { marketingStats } from "../../constants/marketing";

export const StatsRow: React.FC = () => {
  return (
    <section className="marketing-stats">
      {marketingStats.map((stat) => (
        <div key={stat.label} className="stat-card">
          <p className="status-value">{stat.value}</p>
          <p className="status-label">{stat.label}</p>
        </div>
      ))}
    </section>
  );
};
