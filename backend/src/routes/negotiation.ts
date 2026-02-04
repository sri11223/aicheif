import { Router } from "express";
import { z } from "zod";
import { negotiatePlan } from "../negotiation/engine.js";

export const negotiationRouter = Router();

const prioritySchema = z.enum(["low", "medium", "high", "critical"]);
const domainSchema = z.enum(["schedule", "finance", "learning", "health", "communication"]);

const inputSchema = z.object({
  goals: z.array(z.string().min(1)),
  constraints: z.array(
    z.object({
      id: z.string(),
      domain: domainSchema,
      description: z.string(),
      priority: prioritySchema,
      timeWindow: z
        .object({
          start: z.string(),
          end: z.string(),
        })
        .optional(),
    })
  ),
  recommendations: z.array(
    z.object({
      agentId: z.string(),
      domain: domainSchema,
      summary: z.string(),
      impact: z.object({
        effort: z.number().min(0).max(10),
        urgency: z.number().min(0).max(10),
        wellbeing: z.number().min(0).max(10),
        cost: z.number().min(0).max(10),
      }),
      actions: z.array(
        z.object({
          id: z.string(),
          description: z.string(),
          priority: prioritySchema,
        })
      ),
    })
  ),
});

negotiationRouter.post("/preview", (req, res) => {
  const parsed = inputSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "invalid_payload", details: parsed.error.flatten() });
  }

  const result = negotiatePlan(parsed.data);
  return res.json(result);
});
