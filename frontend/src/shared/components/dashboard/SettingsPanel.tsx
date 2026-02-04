"use client";

import React, { useState } from "react";

export const SettingsPanel: React.FC = () => {
  const [sleepProtected, setSleepProtected] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [learningReminders, setLearningReminders] = useState(false);

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Preferences</h2>
        <span className="pill neutral">Settings</span>
      </div>
      <div className="settings-grid">
        <label className="toggle">
          <input
            type="checkbox"
            checked={sleepProtected}
            onChange={(event) => setSleepProtected(event.target.checked)}
          />
          Protect 7.5h sleep window
        </label>
        <label className="toggle">
          <input
            type="checkbox"
            checked={budgetAlerts}
            onChange={(event) => setBudgetAlerts(event.target.checked)}
          />
          Enable budget alerts
        </label>
        <label className="toggle">
          <input
            type="checkbox"
            checked={learningReminders}
            onChange={(event) => setLearningReminders(event.target.checked)}
          />
          Learning reminders on weekdays
        </label>
      </div>
      <p className="subtle">Settings are stored locally for this demo session.</p>
    </section>
  );
};
