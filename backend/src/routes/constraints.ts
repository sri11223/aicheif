import { Router } from "express";
import { memoryStore } from "../repositories/memoryStore.js";

export const constraintRouter = Router();

constraintRouter.get("/", (req, res) => {
  res.json({ constraints: memoryStore.constraints });
});
