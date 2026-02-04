import React from "react";
import { AgentCard } from "../components/AgentCard";
import { CoordinationPanel } from "../components/CoordinationPanel";
import { SystemStatus } from "../components/SystemStatus";

const agentCards = [
  {
    title: "Schedule Agent",
    description: "Keeps deadlines and calendar load balanced.",
    highlights: ["Conflicts resolved", "Daily focus blocks", "Smart reminders"],
  },
  {
    title: "Finance Agent",
    description: "Monitors budget health and suggests optimizations.",
    highlights: ["Spending alerts", "Savings targets", "Bill monitoring"],
  },
  {
    title: "Learning Agent",
    description: "Builds adaptive learning sprints and tracks mastery.",
    highlights: ["Roadmaps", "Progress tracking", "Deadline alignment"],
  },
  {
    title: "Health Agent",
    description: "Protects sleep, workouts, and recovery in busy weeks.",
    highlights: ["Sleep protection", "Workout balance", "Stress safeguards"],
  },
  {
    title: "Communication Agent",
    description: "Prioritizes inbox and drafts responses.",
    highlights: ["Inbox triage", "Reply drafting", "Task extraction"],
  },
];

export default function HomePage() {
  return (
    <main className="dashboard">
      <header className="hero">
        <div>
          <p className="eyebrow">AI Chief of Staff</p>
          <h1>Unified command center for every life domain.</h1>
          <p className="lead">
            Specialized agents continuously negotiate priorities so you stay on track without
            burnout.
          </p>
        </div>
        <div className="hero-card">
          <h3>Today’s focus</h3>
          <ul>
            <li>Finalize board deck by 3pm</li>
            <li>30-minute recovery walk</li>
            <li>Review budget variance report</li>
          </ul>
          <button type="button">Review daily plan</button>
        </div>
      </header>

      <section className="agents">
        <div className="section-header">
          <h2>Agent fleet</h2>
          <p>Each agent owns a domain and updates the shared plan in real time.</p>
        </div>
        <div className="agent-grid">
          {agentCards.map((agent) => (
            <AgentCard key={agent.title} {...agent} />
          ))}
        </div>
      </section>

      <SystemStatus />
      <CoordinationPanel />
    </main>
  );
}
