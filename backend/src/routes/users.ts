import { Router } from "express";
import { memoryStore } from "../repositories/memoryStore.js";

export const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.json({ users: memoryStore.users });
});

userRouter.get("/:id", (req, res) => {
  const user = memoryStore.users.find((item) => item.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: "not_found", message: "User not found" });
  }
  return res.json(user);
});
