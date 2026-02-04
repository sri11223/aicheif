import React from "react";
import { MarketingHero } from "../shared/components/marketing/Hero";
import { FeatureGrid } from "../shared/components/marketing/FeatureGrid";
import { StatsRow } from "../shared/components/marketing/StatsRow";
import { Testimonials } from "../shared/components/marketing/Testimonials";
import { TimeTicker } from "../shared/components/marketing/TimeTicker";

export default function MarketingPage() {
  return (
    <main className="marketing">
      <nav className="marketing-nav">
        <div className="brand">AI Chief of Staff</div>
        <div className="nav-links">
          <a href="/dashboard">Dashboard</a>
          <button type="button" className="ghost">
            Request access
          </button>
        </div>
      </nav>

      <TimeTicker />
      <MarketingHero />
      <StatsRow />
      <FeatureGrid />
      <Testimonials />

      <section className="marketing-cta-section">
        <h2>Ready to run your life with a real-time plan?</h2>
        <p className="lead">Unlock negotiation-ready planning across every domain.</p>
        <div className="marketing-cta">
          <button type="button">Start pilot</button>
          <button type="button" className="ghost">
            Talk to sales
          </button>
        </div>
      </section>
    </main>
  );
}
