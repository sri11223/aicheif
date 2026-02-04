import { AgentRecommendation, Constraint, NegotiationInput, NegotiationResult } from "../domain/types.js";

export interface UserProfile {
  id: string;
  name: string;
  timezone: string;
  email: string;
}

export interface NegotiationRun {
  id: string;
  userId: string;
  input: NegotiationInput;
  output: NegotiationResult;
  createdAt: string;
}

export interface LifePlan {
  id: string;
  userId: string;
  title: string;
  items: Array<{
    id: string;
    domain: string;
    description: string;
    priority: string;
  }>;
  updatedAt: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  start: string;
  end: string;
  priority: string;
}

export interface BudgetSnapshot {
  id: string;
  month: string;
  budget: number;
  spent: number;
  variance: number;
}

export interface LearningRoadmap {
  id: string;
  title: string;
  nextMilestone: string;
  progress: number;
}

export interface HealthHabit {
  id: string;
  name: string;
  target: string;
  status: string;
}

export interface CommunicationItem {
  id: string;
  channel: string;
  summary: string;
  urgency: string;
}

const users: UserProfile[] = [
  {
    id: "user-1",
    name: "Taylor Jordan",
    timezone: "America/Los_Angeles",
    email: "taylor@example.com",
  },
  {
    id: "user-2",
    name: "Riley Morgan",
    timezone: "America/New_York",
    email: "riley@example.com",
  },
];

const constraints: Constraint[] = [
  {
    id: "constraint-sleep",
    domain: "health",
    description: "Protect 7.5h sleep window",
    priority: "critical",
  },
  {
    id: "constraint-budget",
    domain: "finance",
    description: "Keep discretionary spend under $350/week",
    priority: "high",
  },
];

const recommendations: AgentRecommendation[] = [
  {
    agentId: "schedule-agent",
    domain: "schedule",
    summary: "Front-load deep work blocks early in the week.",
    impact: { effort: 4, urgency: 8, wellbeing: 6, cost: 1 },
    actions: [
      {
        id: "action-focus-block",
        description: "Block 9am-12pm focus time Mon-Wed",
        priority: "high",
      },
      {
        id: "action-delegation",
        description: "Delegate routine status updates to async notes",
        priority: "medium",
      },
    ],
  },
  {
    agentId: "health-agent",
    domain: "health",
    summary: "Keep recovery high despite deadline pressure.",
    impact: { effort: 3, urgency: 6, wellbeing: 9, cost: 0 },
    actions: [
      {
        id: "action-sleep",
        description: "Set wind-down reminder at 9:30pm",
        priority: "critical",
      },
      {
        id: "action-mobility",
        description: "Add 15-minute mobility routine after work",
        priority: "medium",
      },
    ],
  },
  {
    agentId: "finance-agent",
    domain: "finance",
    summary: "Stabilize budget after travel week.",
    impact: { effort: 2, urgency: 5, wellbeing: 5, cost: 7 },
    actions: [
      {
        id: "action-subs",
        description: "Pause unused subscriptions",
        priority: "high",
      },
      {
        id: "action-meal",
        description: "Switch to lower-cost meal plan",
        priority: "medium",
      },
    ],
  },
];

const schedule: ScheduleItem[] = [
  {
    id: "sched-1",
    title: "Board deck review",
    start: "2024-07-22T09:00:00-07:00",
    end: "2024-07-22T10:30:00-07:00",
    priority: "high",
  },
  {
    id: "sched-2",
    title: "Hiring sync",
    start: "2024-07-23T13:00:00-07:00",
    end: "2024-07-23T13:30:00-07:00",
    priority: "medium",
  },
  {
    id: "sched-3",
    title: "User research synthesis",
    start: "2024-07-24T11:00:00-04:00",
    end: "2024-07-24T12:00:00-04:00",
    priority: "high",
  },
];

const budgets: BudgetSnapshot[] = [
  { id: "budget-1", month: "July", budget: 4200, spent: 4055, variance: -3.4 },
  { id: "budget-2", month: "July", budget: 3800, spent: 3620, variance: -4.7 },
];

const learningRoadmap: LearningRoadmap[] = [
  {
    id: "learn-1",
    title: "AI Product Leadership",
    nextMilestone: "Complete Module 3 by Friday",
    progress: 62,
  },
  {
    id: "learn-2",
    title: "Data storytelling",
    nextMilestone: "Draft insights summary by Wednesday",
    progress: 45,
  },
];

const healthHabits: HealthHabit[] = [
  { id: "habit-1", name: "Sleep 7.5h", target: "5 nights/week", status: "On track" },
  { id: "habit-2", name: "Strength training", target: "2 sessions/week", status: "1 remaining" },
  { id: "habit-3", name: "Daily steps", target: "8k/day", status: "Behind" },
];

const communications: CommunicationItem[] = [
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
  {
    id: "comm-3",
    channel: "Calendar",
    summary: "Send reschedule options for client sync",
    urgency: "high",
  },
];

const negotiationRuns: NegotiationRun[] = [];
const lifePlans: LifePlan[] = [
  {
    id: "plan-1",
    userId: "user-1",
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
    updatedAt: new Date().toISOString(),
  },
  {
    id: "plan-2",
    userId: "user-2",
    title: "Client delivery sprint",
    items: [
      {
        id: "plan-item-3",
        domain: "communication",
        description: "Send project update summary by Tuesday",
        priority: "high",
      },
      {
        id: "plan-item-4",
        domain: "learning",
        description: "Reserve 2 hours for certification study",
        priority: "medium",
      },
    ],
    updatedAt: new Date().toISOString(),
  },
];

export const memoryStore = {
  users,
  constraints,
  recommendations,
  schedule,
  budgets,
  learningRoadmap,
  healthHabits,
  communications,
  negotiationRuns,
  lifePlans,
};
