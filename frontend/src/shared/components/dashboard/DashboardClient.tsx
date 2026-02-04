"use client";

import React, { useCallback, useMemo, useState } from "react";
import { DashboardData, PlanItem } from "../../types/dashboard";
import { agentCards } from "../../constants/agents";
import { AgentCard } from "../../../components/AgentCard";
import { CoordinationPanel } from "../../../components/CoordinationPanel";
import { SystemStatus } from "../../../components/SystemStatus";
import { DashboardHeader } from "./DashboardHeader";
import { DomainPanels } from "./DomainPanels";
import { PlanHighlights } from "./PlanHighlights";
import { usePolling } from "../../hooks/usePolling";
import { AuthPanel } from "./AuthPanel";
import { AnalyticsPanel } from "./AnalyticsPanel";

interface DashboardClientProps {
  initialData: DashboardData;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000/api";

export const DashboardClient: React.FC<DashboardClientProps> = ({ initialData }) => {
  const [data, setData] = useState<DashboardData>(initialData);
  const [status, setStatus] = useState<string>("Connected");
  const [note, setNote] = useState<string>("");
  const [activeUser, setActiveUser] = useState<string>(initialData.user.id);

  const refreshData = useCallback(
    async (userId = activeUser) => {
    try {
      const response = await fetch(`${baseUrl}/dashboard/${userId}`, { cache: "no-store" });
      if (!response.ok) {
        setStatus("Refresh failed");
        return;
      }
      const payload = (await response.json()) as DashboardData;
      setData(payload);
      setStatus(`Updated ${new Date().toLocaleTimeString()}`);
    } catch (error) {
      console.warn("Refresh failed", error);
      setStatus("Offline");
    }
    },
    [activeUser]
  );

  const runNegotiation = useCallback(async () => {
    setStatus("Running negotiation...");
    try {
      const response = await fetch(`${baseUrl}/orchestration/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: activeUser,
          goals: ["Protect sleep", "Stay on budget"],
        }),
      });
      if (!response.ok) {
        setStatus("Negotiation failed");
        return;
      }
      await refreshData();
    } catch (error) {
      console.warn("Negotiation failed", error);
      setStatus("Negotiation error");
    }
  }, [refreshData]);

  const addQuickNote = useCallback(() => {
    if (!note.trim()) {
      return;
    }
    const newItem: PlanItem = {
      id: `note-${Date.now()}`,
      domain: "schedule",
      description: note.trim(),
      priority: "medium",
    };
    setData((prev) => ({
      ...prev,
      plan: prev.plan
        ? { ...prev.plan, items: [newItem, ...prev.plan.items] }
        : {
            id: "plan-local",
            title: "Personal quick notes",
            items: [newItem],
            updatedAt: new Date().toISOString(),
          },
    }));
    setNote("");
    setStatus("Quick note added");
  }, [note]);

  usePolling(refreshData, 60000);

  const planCount = useMemo(() => data.plan?.items.length ?? 0, [data.plan]);

  return (
    <main className="dashboard">
      <DashboardHeader user={data.user} />

      <AuthPanel
        currentUser={activeUser}
        onSwitch={(userId) => {
          setActiveUser(userId);
          refreshData(userId);
        }}
      />

      <section className="panel">
        <div className="panel-header">
          <h2>Live controls</h2>
          <span className="pill neutral">{status}</span>
        </div>
        <div className="controls-grid">
          <button type="button" onClick={refreshData}>
            Refresh data
          </button>
          <button type="button" onClick={runNegotiation} className="ghost">
            Run negotiation
          </button>
          <div className="controls-metric">
            <p className="metric-title">Active plan items</p>
            <p className="metric-value">{planCount}</p>
          </div>
        </div>
        <div className="quick-add">
          <input
            type="text"
            placeholder="Add a quick focus item"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
          <button type="button" onClick={addQuickNote}>
            Add item
          </button>
        </div>
      </section>

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

      <PlanHighlights plan={data.plan} />
      <AnalyticsPanel data={data} />
      <DomainPanels data={data} />
      <SystemStatus />
      <CoordinationPanel />
    </main>
  );
};
