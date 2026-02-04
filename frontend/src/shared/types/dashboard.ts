export interface DashboardUser {
  id: string;
  name: string;
  timezone: string;
  email: string;
}

export interface PlanItem {
  id: string;
  domain: string;
  description: string;
  priority: string;
}

export interface LifePlan {
  id: string;
  title: string;
  items: PlanItem[];
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

export interface DashboardData {
  user: DashboardUser;
  plan: LifePlan | null;
  schedule: ScheduleItem[];
  budgets: BudgetSnapshot[];
  learning: LearningRoadmap[];
  health: HealthHabit[];
  communications: CommunicationItem[];
}
