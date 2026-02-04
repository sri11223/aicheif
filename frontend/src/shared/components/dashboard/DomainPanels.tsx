import React from "react";
import { DashboardData } from "../../types/dashboard";
import { BudgetChart } from "./BudgetChart";

interface DomainPanelsProps {
  data: DashboardData;
}

export const DomainPanels: React.FC<DomainPanelsProps> = ({ data }) => {
  return (
    <>
      <section className="grid-two">
        <div className="panel">
          <div className="panel-header">
            <h2>Schedule</h2>
            <span className="pill neutral">Live</span>
          </div>
          <ul className="list">
            {data.schedule.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong>
                <span>
                  {item.start} → {item.end}
                </span>
                <span className="tag">{item.priority}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <div className="panel-header">
            <h2>Finance</h2>
            <span className="pill">On track</span>
          </div>
          <BudgetChart budgets={data.budgets} />
        </div>
      </section>

      <section className="grid-two">
        <div className="panel">
          <div className="panel-header">
            <h2>Learning</h2>
            <span className="pill neutral">Sprint</span>
          </div>
          {data.learning.map((item) => (
            <div key={item.id} className="metric-row">
              <div>
                <p className="metric-title">{item.title}</p>
                <p className="subtle">{item.nextMilestone}</p>
              </div>
              <span className="tag">{item.progress}%</span>
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="panel-header">
            <h2>Health</h2>
            <span className="pill">Protected</span>
          </div>
          <ul className="list">
            {data.health.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong>
                <span>{item.target}</span>
                <span className="tag">{item.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Communications</h2>
          <span className="pill neutral">Inbox</span>
        </div>
        <div className="panel-grid">
          {data.communications.map((item) => (
            <div key={item.id} className="panel-card">
              <h4>{item.channel}</h4>
              <p>{item.summary}</p>
              <span className="tag">{item.urgency}</span>
              <div className="action-row">
                <button type="button">Reply</button>
                <button type="button" className="ghost">
                  Archive
                </button>
                <button type="button" className="ghost">
                  Snooze
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
