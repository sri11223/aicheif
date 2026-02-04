import { Router } from "express";
import { memoryStore } from "../repositories/memoryStore.js";

export const dashboardRouter = Router();

dashboardRouter.get("/:userId", (req, res) => {
  const user = memoryStore.users.find((item) => item.id === req.params.userId);
  if (!user) {
    return res.status(404).json({ error: "not_found", message: "User not found" });
  }

  const plan = memoryStore.lifePlans.find((item) => item.userId === user.id);

  return res.json({
    user,
    plan,
    schedule: memoryStore.schedule,
    budgets: memoryStore.budgets,
    learning: memoryStore.learningRoadmap,
    health: memoryStore.healthHabits,
    communications: memoryStore.communications,
    recommendations: memoryStore.recommendations,
    constraints: memoryStore.constraints,
    negotiationRuns: memoryStore.negotiationRuns.slice(0, 3),
  });
});
