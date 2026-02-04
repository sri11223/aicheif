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

## GET /users
Returns users configured in the system.

Response
```json
{
  "users": [
    {
      "id": "user-1",
      "name": "Taylor Jordan",
      "timezone": "America/Los_Angeles",
      "email": "taylor@example.com"
    }
  ]
}
```

## GET /plans/:userId
Returns the latest negotiated plan for a user.

Response
```json
{
  "id": "plan-1",
  "userId": "user-1",
  "title": "Weekly balance plan",
  "items": [
    {
      "id": "plan-item-1",
      "domain": "schedule",
      "description": "Finish board deck before Thursday",
      "priority": "high"
    }
  ],
  "updatedAt": "2024-07-22T16:00:00.000Z"
}
```

## GET /constraints
Returns active constraints used in negotiation.

Response
```json
{
  "constraints": [
    {
      "id": "constraint-sleep",
      "domain": "health",
      "description": "Protect 7.5h sleep window",
      "priority": "critical"
    }
  ]
}
```

## GET /recommendations
Returns agent recommendations from the latest cycle.

Response
```json
{
  "recommendations": [
    {
      "agentId": "schedule-agent",
      "domain": "schedule",
      "summary": "Front-load deep work blocks early in the week.",
      "impact": {
        "effort": 4,
        "urgency": 8,
        "wellbeing": 6,
        "cost": 1
      },
      "actions": [
        {
          "id": "action-focus-block",
          "description": "Block 9am-12pm focus time Mon-Wed",
          "priority": "high"
        }
      ]
    }
  ]
}
```

## GET /dashboard/:userId
Returns a complete dashboard payload for the frontend.

Response
```json
{
  "user": {
    "id": "user-1",
    "name": "Taylor Jordan",
    "timezone": "America/Los_Angeles",
    "email": "taylor@example.com"
  },
  "plan": {
    "id": "plan-1",
    "title": "Weekly balance plan"
  },
  "schedule": [
    {
      "id": "sched-1",
      "title": "Board deck review",
      "start": "2024-07-22T09:00:00-07:00",
      "end": "2024-07-22T10:30:00-07:00",
      "priority": "high"
    }
  ],
  "budgets": [
    {
      "id": "budget-1",
      "month": "July",
      "budget": 4200,
      "spent": 4055,
      "variance": -3.4
    }
  ]
}
```

## POST /orchestration/run
Runs a full negotiation cycle using stored constraints and recommendations.

Request
```json
{
  "userId": "user-1",
  "goals": ["Finalize board deck", "Protect sleep"]
}
```

Response
```json
{
  "result": {
    "summary": "Balanced plan prioritizing urgent work while preserving sleep and financial safety buffers.",
    "resolvedConflicts": ["Protected: Protect 7.5h sleep window"],
    "plan": [
      {
        "id": "action-focus-block",
        "description": "Block 9am-12pm focus time Mon-Wed",
        "owner": "schedule",
        "priority": "high"
      }
    ]
  },
  "latestPlan": {
    "id": "plan-1",
    "title": "Weekly balance plan"
  }
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
