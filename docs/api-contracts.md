# API Contracts

Base URL: `/api`

## GET /health
Returns system health.

Response
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## GET /agents
Returns the registry of agent profiles.

Response
```json
{
  "agents": [
    {
      "id": "schedule-agent",
      "name": "Schedule Agent",
      "domain": "schedule",
      "capabilities": ["calendar", "deadlines"],
      "sla": "Updates within 5 minutes of new events"
    }
  ]
}
```

## POST /negotiations/preview
Returns a negotiated plan based on incoming constraints and recommendations.

Request
```json
{
  "goals": ["Prepare board meeting"],
  "constraints": [
    {
      "id": "c1",
      "domain": "health",
      "description": "Protect 7h sleep",
      "priority": "critical"
    }
  ],
  "recommendations": [
    {
      "agentId": "schedule-agent",
      "domain": "schedule",
      "summary": "Adjust deadlines",
      "impact": { "effort": 6, "urgency": 8, "wellbeing": 5, "cost": 2 },
      "actions": [
        {
          "id": "a1",
          "description": "Move planning block to 9am",
          "priority": "high"
        }
      ]
    }
  ]
}
```

Response
```json
{
  "summary": "Balanced plan prioritizing urgent work while preserving sleep and financial safety buffers.",
  "resolvedConflicts": ["Protected: Protect 7h sleep"],
  "plan": [
    {
      "id": "a1",
      "description": "Move planning block to 9am",
      "owner": "schedule",
      "priority": "high"
    }
  ]
}
```
