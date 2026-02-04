import React from "react";
import { LifePlan } from "../../types/dashboard";

interface PlanHighlightsProps {
  plan: LifePlan | null;
}

export const PlanHighlights: React.FC<PlanHighlightsProps> = ({ plan }) => {
  if (!plan) {
    return (
      <section className="panel">
        <div className="panel-header">
          <h2>Plan highlights</h2>
          <span className="pill neutral">Awaiting updates</span>
        </div>
        <p className="subtle">No plan has been negotiated yet.</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Plan highlights</h2>
        <span className="pill">Updated</span>
      </div>
      <p className="subtle">Last updated {new Date(plan.updatedAt).toLocaleString()}.</p>
      <ul className="list">
        {plan.items.map((item) => (
          <li key={item.id}>
            <strong>{item.description}</strong>
            <span className="subtle">{item.domain}</span>
            <span className="tag">{item.priority}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
