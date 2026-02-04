import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { healthRouter } from "./routes/health.js";
import { agentRouter } from "./routes/agents.js";
import { negotiationRouter } from "./routes/negotiation.js";
import { userRouter } from "./routes/users.js";
import { recommendationRouter } from "./routes/recommendations.js";
import { constraintRouter } from "./routes/constraints.js";
import { planRouter } from "./routes/plans.js";
import { orchestrationRouter } from "./routes/orchestration.js";
import { dashboardRouter } from "./routes/dashboard.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("combined"));

app.use("/api/health", healthRouter);
app.use("/api/agents", agentRouter);
app.use("/api/negotiations", negotiationRouter);
app.use("/api/users", userRouter);
app.use("/api/recommendations", recommendationRouter);
app.use("/api/constraints", constraintRouter);
app.use("/api/plans", planRouter);
app.use("/api/orchestration", orchestrationRouter);
app.use("/api/dashboard", dashboardRouter);

app.use((req, res) => {
  res.status(404).json({ error: "not_found", message: "Route not found" });
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "internal_error", message: "Unexpected error" });
});

app.listen(port, () => {
  console.log(`API listening on ${port}`);
});
