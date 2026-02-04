CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE agent_profiles (
  id TEXT PRIMARY KEY,
  domain TEXT NOT NULL,
  name TEXT NOT NULL,
  capabilities JSONB NOT NULL,
  sla TEXT NOT NULL
);

CREATE TABLE agent_recommendations (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  agent_id TEXT NOT NULL REFERENCES agent_profiles(id),
  payload JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE negotiation_runs (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  input JSONB NOT NULL,
  output JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE schedules (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  start_at TIMESTAMP WITH TIME ZONE NOT NULL,
  end_at TIMESTAMP WITH TIME ZONE NOT NULL,
  priority TEXT NOT NULL
);

CREATE TABLE budgets (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  month TEXT NOT NULL,
  budget NUMERIC NOT NULL,
  spent NUMERIC NOT NULL,
  variance NUMERIC NOT NULL
);

CREATE TABLE learning_roadmaps (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  next_milestone TEXT NOT NULL,
  progress NUMERIC NOT NULL
);

CREATE TABLE health_habits (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  target TEXT NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE communications (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  channel TEXT NOT NULL,
  summary TEXT NOT NULL,
  urgency TEXT NOT NULL
);

CREATE TABLE agent_messages (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  agent_id TEXT NOT NULL REFERENCES agent_profiles(id),
  payload JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
