import React from "react";

interface AgentCardProps {
  title: string;
  description: string;
  highlights: string[];
}

export const AgentCard: React.FC<AgentCardProps> = ({ title, description, highlights }) => {
  return (
    <article className="card">
      <header>
        <h3>{title}</h3>
        <p>{description}</p>
      </header>
      <ul>
        {highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
};
