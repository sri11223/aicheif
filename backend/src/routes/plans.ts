import { Router } from "express";
import { memoryStore } from "../repositories/memoryStore.js";

export const planRouter = Router();

planRouter.get("/", (req, res) => {
  res.json({ plans: memoryStore.lifePlans });
});

planRouter.get("/:userId", (req, res) => {
  const plan = memoryStore.lifePlans.find((item) => item.userId === req.params.userId);
  if (!plan) {
    return res.status(404).json({ error: "not_found", message: "Plan not found" });
  }
  return res.json(plan);
});
