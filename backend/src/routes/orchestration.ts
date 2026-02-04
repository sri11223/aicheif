import { Router } from "express";
import { z } from "zod";
import { memoryStore } from "../repositories/memoryStore.js";
import { runNegotiation } from "../services/negotiationService.js";

export const orchestrationRouter = Router();

const inputSchema = z.object({
  userId: z.string(),
  goals: z.array(z.string().min(1)),
});

orchestrationRouter.post("/run", (req, res) => {
  const parsed = inputSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "invalid_payload", details: parsed.error.flatten() });
  }

  const input = {
    goals: parsed.data.goals,
    constraints: memoryStore.constraints,
    recommendations: memoryStore.recommendations,
  };

  const result = runNegotiation(parsed.data.userId, input);
  return res.json({ result, latestPlan: memoryStore.lifePlans.find((p) => p.userId === parsed.data.userId) });
});
