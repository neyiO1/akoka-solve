"use client";
import { useState } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import MermaidDiagram from "@/components/MermaidDiagram";
import SpecPanel from "@/components/SpecPanel";

const DIAGRAMS = {
  overview: `
flowchart TD
    %% Core Users
    US[UNILAG Student] -->|Mobile PWA| FE
    VU[Validator/U-COHUB] -->|Web Dash| FE
    F[CSR Funder] -->|Web Dash| FE

    %% Frontend Layer
    subgraph Frontend [Presentation Layer - Edge Cached]
        FE[Next.js Frontend]
        SW[Service Worker / IndexedDB]
        FE <--> SW
    end

    %% Backend Layer
    FE <-->|API| BE
    subgraph Backend [Application Layer - Local Hosted]
        BE[Node.js / Express API]
        DB[(MongoDB - User Data)]
        AI[AI Matchmaking Engine]
        BE <--> DB
        BE <--> AI
    end

    %% Decentralized Layer
    BE <-->|Smart Contracts| SC
    subgraph Trust Layer [Blockchain & SSI]
        SC[Smart Contracts / Polygon]
        SSI[Decentralized ID Vault]
        Esusu[Digital Esusu Treasury]
        SC <--> SSI
        SC <--> Esusu
    end

    classDef default fill:#0D1B2A,stroke:#1A6FBF,color:#F5F0E8;
    classDef highlight fill:#8B1A2B,stroke:#C9A84C,color:#F5F0E8;
    class Esusu,SSI highlight;
`,
  offline: `
sequenceDiagram
    participant S as Student App (PWA)
    participant W as Service Worker
    participant L as IndexedDB (Local)
    participant A as Akoka API

    Note over S,L: OFFLINE ENVIRONMENT
    S->>W: Submit Task Proof (Image/Text)
    W->>W: Detect Offline State
    W->>L: Cache Payload
    S-->>S: Update UI "Sync Pending"
    
    Note over S,A: Enters Wi-Fi Zone (Campus)
    W->>W: Detect Online State
    W->>L: Retrieve Pending Payloads
    W->>A: Background Sync API Call
    A-->>W: 200 OK (Task Logged)
    W->>L: Clear Cache
    W->>S: Push Notification: "Task Synced"
`,
  kyc: `
stateDiagram-v2
    [*] --> Tier0
    
    state Tier0 {
        [*] --> Unverified
        Unverified: Anonymous Access
        Unverified: Read-Only Modules
    }
    
    Tier0 --> Tier1 : Phone/Email Verification
    
    state Tier1 {
        [*] --> Basic
        Basic: Can attempt local tasks
        Basic: No financial withdrawal
    }
    
    Tier1 --> Tier2 : Student ID & BVN verification
    
    state Tier2 {
        [*] --> Verified
        Verified: Smart Contract Minting Enabled
        Verified: Esusu micro-funding access
    }

    Tier2 --> [*]
`,
  ai: `
flowchart TD
    User[User Profile & Academics] --> Extract[Feature Extraction]
    Extract --> Bias[Bias Audit Module]
    Bias -->|Flagged| Human[Human-in-Loop Review]
    Bias -->|Passed| DDA[Dynamic Difficulty Adjustment]
    DDA --> Match[Matched Challenge / Module]
    Human --> Match
`,
  esusu: `
sequenceDiagram
    participant S as Student
    participant L as Local Validator
    participant SC as Smart Contract
    participant E as Esusu Pool
    
    S->>SC: Submit Contribution (ACID local tx)
    SC->>S: Request 2FA Idempotency Token
    S->>SC: Sync Token
    SC->>L: Request Confirmation
    L-->>SC: Validator Endorsement
    SC->>E: Lock Funds
    SC->>S: Mint Immutable Credential
    E-->>S: Payout Release (Schedule)
`,
  trust: `
flowchart LR
    Veramo[Veramo SDK DID Provisioning] --> ZKP[ZKP Selective Disclosure]
    ZKP --> OnChain[On-Chain Anchor]
    ZKP --> OffChain[Off-Chain Compressed Storage]
    OnChain --> Verif[Employer / Funder Verification]
    OffChain --> Verif
`,
  flywheel_er: `
erDiagram
    LEARN_MODULE ||--o{ BADGE_SYSTEM : grants
    BADGE_SYSTEM ||--o{ IMPACT_MARKETPLACE : unlocks
    IMPACT_MARKETPLACE ||--o{ PROOF_VERIFICATION : submits
    PROOF_VERIFICATION ||--o{ SMART_CONTRACT_MINT : triggers
    SMART_CONTRACT_MINT ||--o{ ESUSU_WALLET : funds
    SMART_CONTRACT_MINT ||--o{ DIGITAL_CV : updates
    DIGITAL_CV ||--o{ EMPLOYER_API : accessed_by
`,
  tradeable_impact: `
sequenceDiagram
    participant S as Student
    participant V as Local Validator
    participant SC as Smart Contract
    participant CSR as CSR Platform (Benevity)
    participant E as Esusu Wallet
    
    S->>V: Verified Outcome Proof
    V->>SC: Validator Endorsement
    SC->>SC: Mint Tradeable Impact Credit
    SC->>CSR: List on Marketplace
    CSR->>SC: Purchase Credit
    SC->>E: Inject Seed Capital (Collateral-free)
    E-->>S: Student Startup Capital Available
`
};

export default function ArchitecturePage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div style={{ paddingTop: "0px" }}>
      <SectionWrapper bg="dark" style={{ minHeight: "calc(100vh - 80px)", borderRadius: "16px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="badge" style={{ marginBottom: "16px" }}>Technical Spec</span>
          <h1 style={{ fontSize: "3rem", marginBottom: "16px" }}>System Architecture</h1>
          <p style={{ fontSize: "1.25rem", color: "var(--grey-light)", maxWidth: "800px", margin: "0 auto" }}>
            The Akoka Solve technical foundation is built on the Lagos Model of Bypass Innovation.
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "40px", flexWrap: "wrap" }}>
          <button 
            onClick={() => setActiveTab("overview")}
            style={{ padding: "12px 24px", borderRadius: "30px", background: activeTab === "overview" ? "var(--blue)" : "rgba(255,255,255,0.05)", color: "var(--cream)", border: "1px solid", borderColor: activeTab === "overview" ? "var(--blue)" : "rgba(255,255,255,0.1)", cursor: "pointer", fontWeight: "bold", transition: "all 0.2s ease" }}
          >
            System Overview (C4)
          </button>
          <button 
            onClick={() => setActiveTab("offline")}
            style={{ padding: "12px 24px", borderRadius: "30px", background: activeTab === "offline" ? "var(--crimson)" : "rgba(255,255,255,0.05)", color: "var(--cream)", border: "1px solid", borderColor: activeTab === "offline" ? "var(--crimson)" : "rgba(255,255,255,0.1)", cursor: "pointer", fontWeight: "bold", transition: "all 0.2s ease" }}
          >
            Offline-First Sync Flow
          </button>
          <button 
            onClick={() => setActiveTab("kyc")}
            style={{ padding: "8px 16px", borderRadius: "30px", background: activeTab === "kyc" ? "var(--gold)" : "rgba(255,255,255,0.05)", color: activeTab === "kyc" ? "var(--navy)" : "var(--cream)", border: "1px solid", borderColor: activeTab === "kyc" ? "var(--gold)" : "rgba(255,255,255,0.1)", cursor: "pointer", fontWeight: "bold", transition: "all 0.2s ease", fontSize: "0.875rem" }}
          >
            Progressive KYC Tiers
          </button>
          <button 
            onClick={() => setActiveTab("ai")}
            style={{ padding: "8px 16px", borderRadius: "30px", background: activeTab === "ai" ? "var(--green)" : "rgba(255,255,255,0.05)", color: activeTab === "ai" ? "var(--navy)" : "var(--cream)", border: "1px solid", borderColor: activeTab === "ai" ? "var(--green)" : "rgba(255,255,255,0.1)", cursor: "pointer", fontWeight: "bold", transition: "all 0.2s ease", fontSize: "0.875rem" }}
          >
            AI Psychometric Engine
          </button>
          <button 
            onClick={() => setActiveTab("esusu")}
            style={{ padding: "8px 16px", borderRadius: "30px", background: activeTab === "esusu" ? "var(--blue)" : "rgba(255,255,255,0.05)", color: "var(--cream)", border: "1px solid", borderColor: activeTab === "esusu" ? "var(--blue)" : "rgba(255,255,255,0.1)", cursor: "pointer", fontWeight: "bold", transition: "all 0.2s ease", fontSize: "0.875rem" }}
          >
            Esusu Smart Contract
          </button>
          <button 
            onClick={() => setActiveTab("trust")}
            style={{ padding: "8px 16px", borderRadius: "30px", background: activeTab === "trust" ? "var(--crimson)" : "rgba(255,255,255,0.05)", color: "var(--cream)", border: "1px solid", borderColor: activeTab === "trust" ? "var(--crimson)" : "rgba(255,255,255,0.1)", cursor: "pointer", fontWeight: "bold", transition: "all 0.2s ease", fontSize: "0.875rem" }}
          >
            Trust & SSI Layer
          </button>
          <button 
            onClick={() => setActiveTab("flywheel_er")}
            style={{ padding: "8px 16px", borderRadius: "30px", background: activeTab === "flywheel_er" ? "var(--gold)" : "rgba(255,255,255,0.05)", color: activeTab === "flywheel_er" ? "var(--navy)" : "var(--cream)", border: "1px solid", borderColor: activeTab === "flywheel_er" ? "var(--gold)" : "rgba(255,255,255,0.1)", cursor: "pointer", fontWeight: "bold", transition: "all 0.2s ease", fontSize: "0.875rem" }}
          >
            Akoka Flywheel ER
          </button>
          <button 
            onClick={() => setActiveTab("tradeable_impact")}
            style={{ padding: "8px 16px", borderRadius: "30px", background: activeTab === "tradeable_impact" ? "var(--green)" : "rgba(255,255,255,0.05)", color: activeTab === "tradeable_impact" ? "var(--navy)" : "var(--cream)", border: "1px solid", borderColor: activeTab === "tradeable_impact" ? "var(--green)" : "rgba(255,255,255,0.1)", cursor: "pointer", fontWeight: "bold", transition: "all 0.2s ease", fontSize: "0.875rem" }}
          >
            Tradeable Impact Flow
          </button>
        </div>

        {/* Diagram Display */}
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {activeTab === "overview" && (
            <div className="fade-in">
              <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--blue)" }}>High-Level System Overview</h2>
              <p style={{ color: "var(--grey-light)", marginBottom: "24px" }}>A modular architecture separating the presentation layer (optimized for edge delivery) from the immutable trust layer (blockchain & SSI).</p>
              <MermaidDiagram id="overview-diagram" chart={DIAGRAMS.overview} />
              
              <div style={{ marginTop: "40px" }}>
                <SpecPanel title="Infrastructure & Hosting (NITDA Compliant)">
                  In strict adherence to the National Information Technology Development Agency (NITDA) Guidelines on Nigerian Content Development in ICT, all subscriber and consumer data is stored locally within Nigerian-based cloud servers. Static micro-learning modules are cached locally at edge nodes near the UNILAG campus.
                </SpecPanel>
                <SpecPanel title="Hybrid On-Chain/Off-Chain Architecture">
                  To minimize gas fees and ensure rapid data retrieval, we utilize an off-chain compressed storage model (e.g. IPFS) anchored cryptographically to a public blockchain (Polygon). This ensures data immutability without the prohibitive cost of storing massive datasets on-chain.
                </SpecPanel>
                <SpecPanel title="Regulatory Stack Alignment">
                  The system operates in strict compliance with the Central Bank of Nigeria (CBN), BOFIA, the Nigerian Data Protection Regulation (NDPR 2019), and the AML-CFT 2013 framework, ensuring all micro-funding activities are legally sound and protected.
                </SpecPanel>
              </div>
            </div>
          )}
          
          {activeTab === "offline" && (
            <div className="fade-in">
              <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--crimson)" }}>Offline-First Sync Sequence</h2>
              <p style={{ color: "var(--grey-light)", marginBottom: "24px" }}>Utilizing Service Workers and IndexedDB to cache task proofs locally when offline, automatically syncing payload to the server upon detecting a campus Wi-Fi connection.</p>
              <MermaidDiagram id="offline-diagram" chart={DIAGRAMS.offline} />

              <div style={{ marginTop: "40px" }}>
                <SpecPanel title="Service Worker & IndexedDB State Machine">
                  The mobile PWA aggressively intercepts network requests. When offline, task submission proofs (geo-tagged images, mentor signatures) are serialized and written to an IndexedDB queue. A background sync event is registered to flush the queue the moment a stable Wi-Fi connection (like the UNILAG campus network) is detected.
                </SpecPanel>
              </div>
            </div>
          )}
          
          {activeTab === "kyc" && (
            <div className="fade-in">
              <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--gold)" }}>Progressive KYC State Machine</h2>
              <p style={{ color: "var(--grey-light)", marginBottom: "24px" }}>A tiered identity verification model ensuring low barriers to entry for learning, while strictly securing financial and credential distribution pathways.</p>
              <MermaidDiagram id="kyc-diagram" chart={DIAGRAMS.kyc} />

              <div style={{ marginTop: "40px" }}>
                <SpecPanel title="Tiered Verification Thresholds">
                  <strong>Tier 1:</strong> Anonymous access utilizing ZKP (Zero-Knowledge Proofs) for initial learning modules. <br/>
                  <strong>Tier 2:</strong> Peer/Mentor review required for civic task completion. <br/>
                  <strong>Tier 3:</strong> U-COHUB and NYSC institutional verification via biometric matching (BVN) to unlock smart contract minting and Esusu withdrawal.
                </SpecPanel>
              </div>
            </div>
          )}
          
          {activeTab === "ai" && (
            <div className="fade-in">
              <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--green)" }}>AI Psychometric Engine</h2>
              <p style={{ color: "var(--grey-light)", marginBottom: "24px" }}>Adaptive matchmaking algorithm that adjusts difficulty based on bias audits and dynamic assessments.</p>
              <MermaidDiagram id="ai-diagram" chart={DIAGRAMS.ai} />

              <div style={{ marginTop: "40px" }}>
                <SpecPanel title="Responsible AI Guardrails">
                  The matchmaking engine integrates a robust Bias Audit module that continually scans matching outcomes to prevent algorithmic discrimination across gender, regional, or socioeconomic lines. An aggressive 80% task retention target is enforced by dynamically adjusting difficulty (Dynamic Difficulty Adjustment - DDA). Anomalies are flagged for human-in-the-loop review by U-COHUB faculty.
                </SpecPanel>
              </div>
            </div>
          )}
          
          {activeTab === "esusu" && (
            <div className="fade-in">
              <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--blue)" }}>Esusu Smart Contract Sequence</h2>
              <p style={{ color: "var(--grey-light)", marginBottom: "24px" }}>Digital replication of the traditional savings pool using smart contracts for transparent, collateral-free seed capital distribution.</p>
              <MermaidDiagram id="esusu-diagram" chart={DIAGRAMS.esusu} />

              <div style={{ marginTop: "40px" }}>
                <SpecPanel title="Digital Esusu 3-Step Execution">
                  <strong>1. Digitize Pool:</strong> Student contributions and CSR capital are pooled into a trustless treasury. <br/>
                  <strong>2. Validator Consensus:</strong> Local validators (peers, U-COHUB mentors) confirm the real-world completion of an impact task. <br/>
                  <strong>3. Immutable Issuance:</strong> The smart contract automatically mints the credential and cryptographically releases collateral-free seed capital without administrative delay.
                </SpecPanel>
              </div>
            </div>
          )}
          
          {activeTab === "trust" && (
            <div className="fade-in">
              <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--crimson)" }}>Trust & SSI Layer</h2>
              <p style={{ color: "var(--grey-light)", marginBottom: "24px" }}>Decentralized identity architecture utilizing Zero-Knowledge Proofs for selective disclosure and privacy preservation.</p>
              <MermaidDiagram id="trust-diagram" chart={DIAGRAMS.trust} />

              <div style={{ marginTop: "40px" }}>
                <SpecPanel title="Privacy-by-Design & Selective Disclosure">
                  Utilizing the Veramo SDK, students control a Self-Sovereign Identity (SSI) wallet. Through Zero-Knowledge Proofs (ZKP), a student can cryptographically prove they possess a specific skill badge or have passed a KYC tier to an employer, without disclosing their actual physical identity or address. This is critical for protecting marginalized innovators.
                </SpecPanel>
              </div>
            </div>
          )}
          
          {activeTab === "flywheel_er" && (
            <div className="fade-in">
              <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--gold)" }}>Akoka Flywheel Entity Relationship</h2>
              <p style={{ color: "var(--grey-light)", marginBottom: "24px" }}>The underlying data schema mapping learning outcomes to verified impact and economic reward.</p>
              <MermaidDiagram id="flywheel-er-diagram" chart={DIAGRAMS.flywheel_er} />

              <div style={{ marginTop: "40px" }}>
                <SpecPanel title="The Akoka Flywheel Architecture">
                  The core engine driving the platform. It maps <strong>Learn</strong> modules (bypassing the theoretical gap) directly to <strong>Impact</strong> verification (solving civic/environmental/health tasks), which programmatically unlocks <strong>Earn</strong> rewards (tokens and Esusu micro-funding).
                </SpecPanel>
                <SpecPanel title="Target Ecosystem Definition">
                  The database elegantly maps the <strong>Supply</strong> (40,000+ UNILAG students seeking practical skills and startup capital) to the <strong>Demand</strong> (hyper-local civic challenges in the Akoka host community like waste management and educational deficits).
                </SpecPanel>
              </div>
            </div>
          )}
          
          {activeTab === "tradeable_impact" && (
            <div className="fade-in">
              <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--green)" }}>Tradeable Impact Credit Flow</h2>
              <p style={{ color: "var(--grey-light)", marginBottom: "24px" }}>End-to-end lifecycle of transforming verified social outcomes into tradeable digital assets funded by global CSR platforms.</p>
              <MermaidDiagram id="tradeable-impact-diagram" chart={DIAGRAMS.tradeable_impact} />

              <div style={{ marginTop: "40px" }}>
                <SpecPanel title="Charity vs. Tradeable Impact">
                  Traditional charity operates on sympathy-driven sunk costs where youth are passive beneficiaries. The Akoka Solve architecture transforms this into an <strong>Outcome-driven</strong> model. Verified social outcomes become <strong>Tradeable Economic Value</strong> (assets), transforming youth into active changemakers and scaling impact programmatically via smart contracts, bypassing limited grant cycles.
                </SpecPanel>
              </div>
            </div>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
}
