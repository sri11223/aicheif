import { Domain } from "../domain/types.js";

export interface AgentProfile {
  id: string;
  name: string;
  domain: Domain;
  capabilities: string[];
  sla: string;
}

export const agentRegistry: AgentProfile[] = [
  {
    id: "schedule-agent",
    name: "Schedule Agent",
    domain: "schedule",
    capabilities: ["calendar", "deadlines", "task prioritization", "conflict detection"],
    sla: "Updates within 5 minutes of new events",
  },
  {
    id: "finance-agent",
    name: "Finance Agent",
    domain: "finance",
    capabilities: ["budget tracking", "spending alerts", "goal forecasting"],
    sla: "Daily insights by 7am local time",
  },
  {
    id: "learning-agent",
    name: "Learning Agent",
    domain: "learning",
    capabilities: ["study planning", "progress tracking", "adaptive roadmaps"],
    sla: "Weekly plan refresh every Sunday",
  },
  {
    id: "health-agent",
    name: "Health Agent",
    domain: "health",
    capabilities: ["habit tracking", "sleep protection", "workout planning"],
    sla: "Real-time load-based adjustments",
  },
  {
    id: "communication-agent",
    name: "Email & Communication Agent",
    domain: "communication",
    capabilities: ["inbox triage", "draft responses", "task extraction"],
    sla: "Inbox prioritization every 15 minutes",
  },
];
