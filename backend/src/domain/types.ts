export type Domain =
  | "schedule"
  | "finance"
  | "learning"
  | "health"
  | "communication";

export type Priority = "low" | "medium" | "high" | "critical";

export interface Constraint {
  id: string;
  domain: Domain;
  description: string;
  priority: Priority;
  timeWindow?: {
    start: string;
    end: string;
  };
}

export interface AgentRecommendation {
  agentId: string;
  domain: Domain;
  summary: string;
  impact: {
    effort: number;
    urgency: number;
    wellbeing: number;
    cost: number;
  };
  actions: Array<{
    id: string;
    description: string;
    priority: Priority;
  }>;
}

export interface NegotiationInput {
  goals: string[];
  constraints: Constraint[];
  recommendations: AgentRecommendation[];
}

export interface NegotiationResult {
  summary: string;
  resolvedConflicts: string[];
  plan: Array<{
    id: string;
    description: string;
    owner: Domain;
    priority: Priority;
  }>;
}
