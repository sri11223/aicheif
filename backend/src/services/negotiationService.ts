import { memoryStore } from "../repositories/memoryStore.js";
import { negotiatePlan } from "../negotiation/engine.js";
import { NegotiationInput, NegotiationResult } from "../domain/types.js";

const createId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

export const runNegotiation = (userId: string, input: NegotiationInput): NegotiationResult => {
  const result = negotiatePlan(input);
  const run = {
    id: createId("run"),
    userId,
    input,
    output: result,
    createdAt: new Date().toISOString(),
  };
  memoryStore.negotiationRuns.unshift(run);
  const plan = memoryStore.lifePlans.find((item) => item.userId === userId);
  if (plan) {
    plan.items = result.plan.map((item) => ({
      id: item.id,
      domain: item.owner,
      description: item.description,
      priority: item.priority,
    }));
    plan.updatedAt = new Date().toISOString();
  }
  return result;
};
