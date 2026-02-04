import React from "react";
import { marketingTestimonials } from "../../constants/marketing";

export const Testimonials: React.FC = () => {
  return (
    <section className="marketing-section">
      <div className="section-header">
        <h2>Designed to feel like a real chief of staff</h2>
        <p>Trusted by operators, founders, and product leaders.</p>
      </div>
      <div className="panel-grid">
        {marketingTestimonials.map((item) => (
          <div key={item.name} className="panel-card">
            <p>“{item.quote}”</p>
            <p className="subtle">
              <strong>{item.name}</strong> · {item.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
