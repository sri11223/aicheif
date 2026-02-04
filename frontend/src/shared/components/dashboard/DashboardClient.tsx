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
import { NotificationsPanel, NotificationItem } from "./NotificationsPanel";
import { SettingsPanel } from "./SettingsPanel";
import { SignInPanel } from "./SignInPanel";
import { useSession } from "../../hooks/useSession";

interface DashboardClientProps {
  initialData: DashboardData;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000/api";

export const DashboardClient: React.FC<DashboardClientProps> = ({ initialData }) => {
  const { session, signIn, signOut } = useSession();
  const [data, setData] = useState<DashboardData>(initialData);
  const [status, setStatus] = useState<string>("Connected");
  const [note, setNote] = useState<string>("");
  const [activeUser, setActiveUser] = useState<string>(initialData.user.id);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "notif-1",
      title: "Negotiation completed",
      detail: "Plan refreshed with 2 protected constraints.",
      status: "new",
    },
    {
      id: "notif-2",
      title: "Budget alert",
      detail: "Dining spend trending 8% above baseline.",
      status: "new",
    },
  ]);

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
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: "Negotiation run",
          detail: "Plan updated with latest recommendations.",
          status: "new",
        },
        ...prev,
      ]);
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
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: "Plan updated",
        detail: "Quick focus item added to your plan.",
        status: "new",
      },
      ...prev,
    ]);
  }, [note]);

  usePolling(refreshData, 60000);

  const planCount = useMemo(() => data.plan?.items.length ?? 0, [data.plan]);

  const handleAddSchedule = (title: string) => {
    setData((prev) => ({
      ...prev,
      schedule: [
        {
          id: `sched-${Date.now()}`,
          title,
          start: new Date().toISOString(),
          end: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
          priority: "medium",
        },
        ...prev.schedule,
      ],
    }));
    setStatus("Schedule updated");
  };

  const handleAddBudget = (month: string, budget: number, spent: number) => {
    const variance = Math.round(((spent - budget) / budget) * 1000) / 10;
    setData((prev) => ({
      ...prev,
      budgets: [
        { id: `budget-${Date.now()}`, month, budget, spent, variance },
        ...prev.budgets,
      ],
    }));
    setStatus("Budget snapshot saved");
  };

  const handleAddHabit = (name: string, target: string) => {
    setData((prev) => ({
      ...prev,
      health: [
        { id: `habit-${Date.now()}`, name, target, status: "New" },
        ...prev.health,
      ],
    }));
    setStatus("Habit added");
  };

  const handleAddCommunication = (channel: string, summary: string) => {
    setData((prev) => ({
      ...prev,
      communications: [
        { id: `comm-${Date.now()}`, channel, summary, urgency: "medium" },
        ...prev.communications,
      ],
    }));
    setStatus("Inbox updated");
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "read" } : item))
    );
  };

  if (!session) {
    return (
      <main className="dashboard">
        <SignInPanel
          onSignIn={(userId, name, email) => {
            signIn({ userId, name, email });
            setActiveUser(userId);
            refreshData(userId);
          }}
        />
      </main>
    );
  }

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
      <button type="button" className="ghost" onClick={signOut}>
        Sign out
      </button>

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
      <DomainPanels
        data={data}
        onAddSchedule={handleAddSchedule}
        onAddBudget={handleAddBudget}
        onAddHabit={handleAddHabit}
        onAddCommunication={handleAddCommunication}
      />
      <NotificationsPanel items={notifications} onMarkRead={markNotificationRead} />
      <SettingsPanel />
      <SystemStatus />
      <CoordinationPanel />
    </main>
  );
};
