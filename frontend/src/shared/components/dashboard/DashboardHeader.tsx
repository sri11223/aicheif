import React from "react";
import { DashboardUser } from "../../types/dashboard";

interface DashboardHeaderProps {
  user: DashboardUser;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  return (
    <header className="hero">
      <div>
        <p className="eyebrow">AI Chief of Staff</p>
        <h1>Unified command center for every life domain.</h1>
        <p className="lead">
          Specialized agents continuously negotiate priorities so you stay on track without burnout.
        </p>
        <div className="hero-meta">
          <span>{user.name}</span>
          <span>{user.timezone}</span>
          <span>{user.email}</span>
        </div>
      </div>
      <div className="hero-card">
        <h3>Today’s focus</h3>
        <p className="subtle">Review the latest negotiation cycle and focus on the top priorities.</p>
        <button type="button">Review daily plan</button>
      </div>
    </header>
  );
};
