"use client";
import SectionWrapper from "@/components/SectionWrapper";
import SroiChart from "@/components/SroiChart";

export default function ImpactPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <SectionWrapper bg="dark" id="impact-hero" style={{ minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <span className="badge" style={{ marginBottom: "16px" }}>Measurement & Accountability</span>
          <h1 style={{ fontSize: "3rem", marginBottom: "16px" }}>The Impact Engine</h1>
          <p style={{ fontSize: "1.25rem", color: "var(--grey-light)", maxWidth: "800px", margin: "0 auto" }}>
            We don't just tell stories. We quantify systemic change using transparent, SDG-aligned metrics.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="navy" id="target-ecosystem">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "24px" }}>The Target Ecosystem</h2>
            <p style={{ fontSize: "1.125rem", color: "var(--grey-light)", marginBottom: "24px" }}>
              A hyper-local, mutually beneficial community transformation powered by decentralized technology.
            </p>
            <div style={{ paddingLeft: "16px", borderLeft: "4px solid var(--gold)", marginBottom: "24px" }}>
              <h4 style={{ color: "var(--gold)", marginBottom: "8px" }}>The Supply: UNILAG</h4>
              <p style={{ color: "var(--cream)" }}>40,000+ students seeking practical skills, startup capital, and verified career pathways.</p>
            </div>
            <div style={{ paddingLeft: "16px", borderLeft: "4px solid var(--green)" }}>
              <h4 style={{ color: "var(--green)", marginBottom: "8px" }}>The Demand: Akoka Host Community</h4>
              <p style={{ color: "var(--cream)" }}>Pressing civic challenges: waste management, health access, and educational deficits.</p>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", height: "300px" }}>
            {/* Venn Diagram */}
            <div style={{ position: "absolute", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(201, 168, 76, 0.4)", mixBlendMode: "screen", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "20px", transform: "translateX(-40px)", border: "2px solid var(--gold)" }}>
              <span style={{ fontWeight: "bold" }}>UNILAG</span>
            </div>
            <div style={{ position: "absolute", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(30, 138, 94, 0.4)", mixBlendMode: "screen", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "20px", transform: "translateX(40px)", border: "2px solid var(--green)" }}>
              <span style={{ fontWeight: "bold" }}>AKOKA</span>
            </div>
            <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
              <span style={{ fontWeight: "bold", color: "white", textShadow: "0px 2px 4px rgba(0,0,0,0.5)" }}>IMPACT</span>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="dark" id="tradeable-impact">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "2.5rem" }}>Redefining Value: Tradeable Impact</h2>
          <p style={{ fontSize: "1.25rem", color: "var(--grey-light)", maxWidth: "700px", margin: "0 auto" }}>
            Transitioning from the sympathy-driven charity model to an outcome-driven stakeholder economy.
          </p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", overflow: "hidden" }}>
            <thead>
              <tr style={{ background: "rgba(0,0,0,0.2)" }}>
                <th style={{ padding: "20px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "var(--grey-light)" }}>Dimension</th>
                <th style={{ padding: "20px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "var(--crimson)" }}>Traditional Charity</th>
                <th style={{ padding: "20px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "var(--green)", background: "rgba(30, 138, 94, 0.1)" }}>Tradeable Impact (Akoka Solve)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", fontWeight: "bold" }}>Funding Logic</td>
                <td style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "var(--grey-light)" }}>Sympathy-driven</td>
                <td style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(30, 138, 94, 0.05)", fontWeight: "bold" }}>Outcome-driven</td>
              </tr>
              <tr>
                <td style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", fontWeight: "bold" }}>Youth Role</td>
                <td style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "var(--grey-light)" }}>Passive Beneficiary</td>
                <td style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(30, 138, 94, 0.05)", fontWeight: "bold" }}>Active Changemaker & Value Creator</td>
              </tr>
              <tr>
                <td style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", fontWeight: "bold" }}>Capital Return</td>
                <td style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "var(--grey-light)" }}>Sunk Cost</td>
                <td style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(30, 138, 94, 0.05)", fontWeight: "bold" }}>Tradeable Economic Value (Verified assets)</td>
              </tr>
              <tr>
                <td style={{ padding: "20px", fontWeight: "bold" }}>Scalability</td>
                <td style={{ padding: "20px", color: "var(--grey-light)" }}>Limited by grant cycles</td>
                <td style={{ padding: "20px", background: "rgba(30, 138, 94, 0.05)", fontWeight: "bold" }}>Unlimited via programmatic smart contracts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="navy" id="measurement">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
          <div className="glass-card" style={{ borderTop: "4px solid var(--blue)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>IRIS+ Framework</h3>
            <p style={{ color: "var(--grey-light)", marginBottom: "16px" }}>
              Utilizing 571 SDG-aligned operational metrics to track skill acquisition rates, demographic engagement, and community health outcomes.
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: "20px", color: "var(--grey-light)", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>80% Task Retention Target</li>
              <li>3 KYC Verification Tiers</li>
              <li>ZKP Anonymous Credentialing</li>
            </ul>
          </div>
          
          <div className="glass-card" style={{ borderTop: "4px solid var(--green)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>Social Return on Investment (SROI)</h3>
            <p style={{ color: "var(--grey-light)" }}>
              A conservative, monetised cost-benefit analysis for our funders. Every ₦1 invested yields ₦8 in verifiable social and economic value.
            </p>
            <SroiChart />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="dark" id="stakeholders">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>Key Stakeholder Integration</h2>
          <p style={{ fontSize: "1.25rem", color: "var(--grey-light)", maxWidth: "700px", margin: "0 auto" }}>
            Our architecture aligns institutional mandates with grassroots execution.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          <div className="glass-card" style={{ borderLeft: "4px solid var(--gold)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>U-COHUB</h3>
            <p style={{ color: "var(--grey-light)" }}>
              University Co-Creation/Innovation Hub. Integrating grassroots innovation directly into the UNILAG curriculum alongside structured faculty mentorship.
            </p>
          </div>
          <div className="glass-card" style={{ borderLeft: "4px solid var(--green)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>NYSC</h3>
            <p style={{ color: "var(--grey-light)" }}>
              Aligning localized community impact directly with the National Youth Service Corps mandates for official credentialing and national scale.
            </p>
          </div>
          <div className="glass-card" style={{ borderLeft: "4px solid var(--blue)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>Global CSR</h3>
            <p style={{ color: "var(--grey-light)" }}>
              Platforms like Benevity & Groundswell connect global corporate social capital directly to verified local impact outcomes without administrative friction.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
