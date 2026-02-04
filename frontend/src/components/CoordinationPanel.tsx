import React from "react";

const negotiationItems = [
  {
    title: "Deadline spike response",
    detail: "Reduced gym volume to 2 sessions while enforcing 7.5h sleep window.",
  },
  {
    title: "Budget overage response",
    detail: "Swapped meal plan to lower-cost options and paused unused subscriptions.",
  },
  {
    title: "Learning sprint response",
    detail: "Moved finance review to Friday to unlock a 3-hour study block midweek.",
  },
];

export const CoordinationPanel: React.FC = () => {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Coordination Layer</h2>
        <span className="pill">Live negotiation</span>
      </div>
      <p className="subtle">
        Agents share constraints, resolve conflicts, and rebalance weekly plans automatically.
      </p>
      <div className="panel-grid">
        {negotiationItems.map((item) => (
          <div key={item.title} className="panel-card">
            <h4>{item.title}</h4>
            <p>{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
