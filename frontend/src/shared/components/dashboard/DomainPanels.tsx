import React from "react";
import { DashboardData } from "../../types/dashboard";
import { BudgetChart } from "./BudgetChart";

interface DomainPanelsProps {
  data: DashboardData;
  onAddSchedule: (title: string) => void;
  onAddBudget: (month: string, budget: number, spent: number) => void;
  onAddHabit: (name: string, target: string) => void;
  onAddCommunication: (channel: string, summary: string) => void;
}

export const DomainPanels: React.FC<DomainPanelsProps> = ({
  data,
  onAddSchedule,
  onAddBudget,
  onAddHabit,
  onAddCommunication,
}) => {
  const handleScheduleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("scheduleTitle") ?? "").trim();
    if (title) {
      onAddSchedule(title);
      event.currentTarget.reset();
    }
  };

  const handleBudgetSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const month = String(formData.get("budgetMonth") ?? "").trim();
    const budget = Number(formData.get("budgetTotal"));
    const spent = Number(formData.get("budgetSpent"));
    if (month && budget > 0) {
      onAddBudget(month, budget, spent);
      event.currentTarget.reset();
    }
  };

  const handleHabitSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("habitName") ?? "").trim();
    const target = String(formData.get("habitTarget") ?? "").trim();
    if (name && target) {
      onAddHabit(name, target);
      event.currentTarget.reset();
    }
  };

  const handleCommunicationSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const channel = String(formData.get("commChannel") ?? "").trim();
    const summary = String(formData.get("commSummary") ?? "").trim();
    if (channel && summary) {
      onAddCommunication(channel, summary);
      event.currentTarget.reset();
    }
  };

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
          <form className="inline-form" onSubmit={handleScheduleSubmit}>
            <input name="scheduleTitle" placeholder="Add schedule item" />
            <button type="submit">Add</button>
          </form>
        </div>
        <div className="panel">
          <div className="panel-header">
            <h2>Finance</h2>
            <span className="pill">On track</span>
          </div>
          <BudgetChart budgets={data.budgets} />
          <form className="inline-form" onSubmit={handleBudgetSubmit}>
            <input name="budgetMonth" placeholder="Month" />
            <input name="budgetTotal" type="number" placeholder="Budget" />
            <input name="budgetSpent" type="number" placeholder="Spent" />
            <button type="submit">Save</button>
          </form>
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
          <form className="inline-form" onSubmit={handleHabitSubmit}>
            <input name="habitName" placeholder="Habit name" />
            <input name="habitTarget" placeholder="Target" />
            <button type="submit">Add</button>
          </form>
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
        <form className="inline-form" onSubmit={handleCommunicationSubmit}>
          <input name="commChannel" placeholder="Channel" />
          <input name="commSummary" placeholder="Summary" />
          <button type="submit">Add</button>
        </form>
      </section>
    </>
  );
};
