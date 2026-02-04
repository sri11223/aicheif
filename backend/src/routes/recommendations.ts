import { Router } from "express";
import { memoryStore } from "../repositories/memoryStore.js";

export const recommendationRouter = Router();

recommendationRouter.get("/", (req, res) => {
  res.json({ recommendations: memoryStore.recommendations });
});
