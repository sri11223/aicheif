# Agent Communication Flow

## Sequence
1. **User state ingestion**: schedule, finance, learning, health, and inbox signals stream into the system.
2. **Agent analysis**: each agent evaluates its domain and emits recommendations + constraints.
3. **Negotiation**: the orchestration layer merges constraints, scores actions, and produces a balanced plan.
4. **Plan update**: the shared life plan is updated and broadcast to all agents.
5. **Feedback loop**: progress, spending, and workload changes trigger another negotiation cycle.

## Conflict Resolution Rules
- Critical constraints (sleep, budget limits, urgent deadlines) are protected first.
- High-urgency work is scheduled early while maintaining health guardrails.
- Finance constraints adjust discretionary spending before reducing strategic goals.
- Learning sprints are protected when deadlines are near, otherwise shifted to off-peak slots.

## Example Data Exchange
- Schedule Agent sends: upcoming deadlines, focus block suggestions.
- Health Agent sends: sleep window, recovery needs.
- Finance Agent sends: variance alerts, optimization actions.
- Communication Agent sends: inbox priorities and response drafts.
