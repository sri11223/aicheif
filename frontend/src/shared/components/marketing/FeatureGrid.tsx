import React from "react";
import { marketingFeatures } from "../../constants/marketing";

export const FeatureGrid: React.FC = () => {
  return (
    <section className="marketing-section">
      <div className="section-header">
        <h2>Built for real-life complexity</h2>
        <p>Negotiation-first AI keeps every domain aligned.</p>
      </div>
      <div className="panel-grid">
        {marketingFeatures.map((feature) => (
          <div key={feature.title} className="panel-card">
            <h4>{feature.title}</h4>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
