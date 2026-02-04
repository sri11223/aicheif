import { Router } from "express";
import { agentRegistry } from "../agents/registry.js";

export const agentRouter = Router();

agentRouter.get("/", (req, res) => {
  res.json({ agents: agentRegistry });
});
