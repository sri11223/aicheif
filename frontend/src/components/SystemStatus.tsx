import React from "react";

const metrics = [
  { label: "Active agent streams", value: "5" },
  { label: "Negotiation cycles today", value: "12" },
  { label: "Upcoming deadlines", value: "7" },
  { label: "Budget variance", value: "-3.4%" },
];

export const SystemStatus: React.FC = () => {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>System Health</h2>
        <span className="pill neutral">Stable</span>
      </div>
      <div className="status-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="status-card">
            <p className="status-value">{metric.value}</p>
            <p className="status-label">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
