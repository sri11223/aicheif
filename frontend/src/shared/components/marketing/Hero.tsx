import React from "react";

export const MarketingHero: React.FC = () => {
  return (
    <section className="marketing-hero">
      <div>
        <p className="eyebrow">AI Chief of Staff</p>
        <h1>Personal Life OS that negotiates your priorities for you.</h1>
        <p className="lead">
          A unified dashboard where specialized agents coordinate your schedule, finances, learning,
          health, and communications — without burning you out.
        </p>
        <div className="marketing-cta">
          <button type="button">Request early access</button>
          <button type="button" className="ghost">
            View live demo
          </button>
        </div>
      </div>
      <div className="marketing-card">
        <h3>Live plan snapshot</h3>
        <ul>
          <li>Protect 7.5h sleep window</li>
          <li>Finish board deck before Thursday</li>
          <li>Pause low-usage subscriptions</li>
        </ul>
        <p className="subtle">Negotiated 12 minutes ago</p>
      </div>
    </section>
  );
};
