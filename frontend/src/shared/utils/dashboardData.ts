import { DashboardData } from "../types/dashboard";

export const fallbackDashboardData: DashboardData = {
  user: {
    id: "user-1",
    name: "Taylor Jordan",
    timezone: "America/Los_Angeles",
    email: "taylor@example.com",
  },
  plan: {
    id: "plan-1",
    title: "Weekly balance plan",
    items: [
      {
        id: "plan-item-1",
        domain: "schedule",
        description: "Finish board deck before Thursday",
        priority: "high",
      },
      {
        id: "plan-item-2",
        domain: "health",
        description: "Two strength sessions + daily walk",
        priority: "medium",
      },
    ],
    updatedAt: "2024-07-22T16:00:00.000Z",
  },
  schedule: [
    {
      id: "sched-1",
      title: "Board deck review",
      start: "2024-07-22T09:00:00-07:00",
      end: "2024-07-22T10:30:00-07:00",
      priority: "high",
    },
  ],
  budgets: [{ id: "budget-1", month: "July", budget: 4200, spent: 4055, variance: -3.4 }],
  learning: [
    {
      id: "learn-1",
      title: "AI Product Leadership",
      nextMilestone: "Complete Module 3 by Friday",
      progress: 62,
    },
  ],
  health: [
    { id: "habit-1", name: "Sleep 7.5h", target: "5 nights/week", status: "On track" },
    { id: "habit-2", name: "Strength training", target: "2 sessions/week", status: "1 remaining" },
  ],
  communications: [
    {
      id: "comm-1",
      channel: "Email",
      summary: "Respond to investor check-in thread",
      urgency: "high",
    },
    {
      id: "comm-2",
      channel: "Slack",
      summary: "Approve design handoff in #product",
      urgency: "medium",
    },
  ],
};

export const getDashboardData = async (): Promise<DashboardData> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000/api";
  try {
    const response = await fetch(`${baseUrl}/dashboard/user-1`, { cache: "no-store" });
    if (!response.ok) {
      return fallbackDashboardData;
    }
    return (await response.json()) as DashboardData;
  } catch (error) {
    console.warn("Falling back to demo data", error);
    return fallbackDashboardData;
  }
};
