"use client";

import React from "react";

interface AuthPanelProps {
  currentUser: string;
  onSwitch: (userId: string) => void;
}

const demoUsers = [
  { id: "user-1", label: "Taylor Jordan" },
  { id: "user-2", label: "Riley Morgan" },
];

export const AuthPanel: React.FC<AuthPanelProps> = ({ currentUser, onSwitch }) => {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Session</h2>
        <span className="pill neutral">Demo auth</span>
      </div>
      <p className="subtle">Switch between demo users to preview personalized dashboards.</p>
      <div className="session-row">
        {demoUsers.map((user) => (
          <button
            key={user.id}
            type="button"
            className={currentUser === user.id ? "active" : "ghost"}
            onClick={() => onSwitch(user.id)}
          >
            {user.label}
          </button>
        ))}
      </div>
    </section>
  );
};
