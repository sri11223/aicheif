import React from "react";
import { DashboardData } from "../../types/dashboard";

interface AnalyticsPanelProps {
  data: DashboardData;
}

export const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ data }) => {
  const budget = data.budgets[0];
  const progress = data.learning[0];

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Insights & trends</h2>
        <span className="pill neutral">Analytics</span>
      </div>
      <div className="panel-grid">
        <div className="panel-card">
          <h4>Budget burn rate</h4>
          <p className="metric-value">
            {budget ? `${Math.round((budget.spent / budget.budget) * 100)}%` : "--"}
          </p>
          <p className="subtle">Projected variance {budget ? `${budget.variance}%` : "--"}</p>
        </div>
        <div className="panel-card">
          <h4>Learning momentum</h4>
          <p className="metric-value">{progress ? `${progress.progress}%` : "--"}</p>
          <p className="subtle">Next milestone: {progress?.nextMilestone ?? "--"}</p>
        </div>
        <div className="panel-card">
          <h4>Focus capacity</h4>
          <p className="metric-value">82%</p>
          <p className="subtle">Protected sleep window maintained</p>
        </div>
      </div>
    </section>
  );
};
