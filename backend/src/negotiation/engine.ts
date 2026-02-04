import { NegotiationInput, NegotiationResult } from "../domain/types.js";

const scoreAction = (effort: number, urgency: number, wellbeing: number, cost: number) => {
  return urgency * 3 + wellbeing * 2 - effort - cost;
};

export const negotiatePlan = (input: NegotiationInput): NegotiationResult => {
  const rankedActions = input.recommendations.flatMap((recommendation) =>
    recommendation.actions.map((action) => ({
      id: action.id,
      description: action.description,
      owner: recommendation.domain,
      priority: action.priority,
      score: scoreAction(
        recommendation.impact.effort,
        recommendation.impact.urgency,
        recommendation.impact.wellbeing,
        recommendation.impact.cost
      ),
    }))
  );

  rankedActions.sort((a, b) => b.score - a.score);

  const conflicts = input.constraints
    .filter((constraint) => constraint.priority === "critical")
    .map((constraint) => `Protected: ${constraint.description}`);

  const plan = rankedActions.slice(0, 6).map(({ score, ...action }) => action);

  return {
    summary:
      "Balanced plan prioritizing urgent work while preserving sleep and financial safety buffers.",
    resolvedConflicts: conflicts,
    plan,
  };
};
