"use client";
import EndpointCard from "@/components/EndpointCard";
import CodeBlock from "@/components/CodeBlock";

export default function DocsPage() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
    }
  };

  return (
    <div style={{ display: "flex", paddingTop: "0px", minHeight: "100vh", background: "var(--navy)" }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: "280px", borderRight: "1px solid rgba(255,255,255,0.05)", padding: "40px 24px", position: "sticky", top: "80px", height: "calc(100vh - 80px)", overflowY: "auto", background: "rgba(13,27,42,0.5)" }}>
        <h3 style={{ fontSize: "1.125rem", color: "var(--gold)", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid rgba(201,168,76,0.2)", paddingBottom: "12px" }}>API Reference</h3>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
          <li><button onClick={() => scrollTo("auth")} style={{ background: "none", border: "none", color: "var(--grey-light)", cursor: "pointer", fontSize: "1rem", textAlign: "left", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="var(--cream)"} onMouseLeave={(e) => e.target.style.color="var(--grey-light)"}>Authentication (SSI)</button></li>
          <li><button onClick={() => scrollTo("learn")} style={{ background: "none", border: "none", color: "var(--grey-light)", cursor: "pointer", fontSize: "1rem", textAlign: "left", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="var(--cream)"} onMouseLeave={(e) => e.target.style.color="var(--grey-light)"}>Learning Modules</button></li>
          <li><button onClick={() => scrollTo("impact")} style={{ background: "none", border: "none", color: "var(--grey-light)", cursor: "pointer", fontSize: "1rem", textAlign: "left", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="var(--cream)"} onMouseLeave={(e) => e.target.style.color="var(--grey-light)"}>Impact Verification</button></li>
          <li><button onClick={() => scrollTo("credentials")} style={{ background: "none", border: "none", color: "var(--grey-light)", cursor: "pointer", fontSize: "1rem", textAlign: "left", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="var(--cream)"} onMouseLeave={(e) => e.target.style.color="var(--grey-light)"}>Credentials & CSR</button></li>
          <li><button onClick={() => scrollTo("esusu")} style={{ background: "none", border: "none", color: "var(--grey-light)", cursor: "pointer", fontSize: "1rem", textAlign: "left", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="var(--cream)"} onMouseLeave={(e) => e.target.style.color="var(--grey-light)"}>Digital Esusu</button></li>
          <li><button onClick={() => scrollTo("institutions")} style={{ background: "none", border: "none", color: "var(--grey-light)", cursor: "pointer", fontSize: "1rem", textAlign: "left", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="var(--cream)"} onMouseLeave={(e) => e.target.style.color="var(--grey-light)"}>Institutions</button></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "60px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "16px" }}>Akoka Solve API</h1>
        <p style={{ fontSize: "1.25rem", color: "var(--grey-light)", marginBottom: "40px", lineHeight: 1.6 }}>
          The decentralized architectural backbone. These endpoints enable institutional partners (U-COHUB, NYSC), global CSR funders (Benevity, Groundswell), and local employers to programmatically integrate with the Akoka Flywheel.
        </p>
        
        <div style={{ background: "rgba(25, 111, 191, 0.1)", border: "1px solid var(--blue)", borderRadius: "8px", padding: "16px 24px", marginBottom: "60px" }}>
          <p style={{ color: "var(--cream)", fontSize: "0.875rem", margin: 0 }}>
            <strong>Base URL:</strong> <code>https://api.akokasolve.com/v1</code>
          </p>
        </div>

        {/* 1. AUTHENTICATION */}
        <section id="auth" style={{ marginBottom: "80px" }}>
          <div style={{ borderBottom: "2px solid var(--blue)", paddingBottom: "16px", marginBottom: "32px" }}>
            <span className="badge" style={{ marginBottom: "12px", background: "rgba(25,111,191,0.2)", color: "var(--blue)", border: "1px solid var(--blue)" }}>Identity Layer</span>
            <h2 style={{ fontSize: "2rem" }}>Authentication (SSI)</h2>
          </div>
          
          <EndpointCard method="POST" path="/auth/ssi-verify" title="Verify Decentralized ID" description="Authenticates a user via their Veramo SDK Decentralized Identifier (DID) signature and returns a session JWT.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Request Body</h4>
            <CodeBlock code={'{\n  "did": "did:ethr:0x123abc...",\n  "signature": "0xabc...",\n  "nonce": "8f2a1b"\n}'} />
          </EndpointCard>
          
          <EndpointCard method="GET" path="/auth/zkp-credential" title="ZKP Selective Disclosure" description="Allows anonymous read-only access utilizing Zero-Knowledge Proofs (e.g. marginalized groups protecting physical identity while retaining verified status).">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Response Schema</h4>
            <CodeBlock code={'{\n  "status": "verified",\n  "tier": 0,\n  "anonymous_token": "zkp_99x..."\n}'} />
          </EndpointCard>
        </section>

        {/* 2. LEARNING MODULES */}
        <section id="learn" style={{ marginBottom: "80px" }}>
          <div style={{ borderBottom: "2px solid var(--blue)", paddingBottom: "16px", marginBottom: "32px" }}>
            <span className="badge" style={{ marginBottom: "12px", background: "rgba(25,111,191,0.2)", color: "var(--blue)", border: "1px solid var(--blue)" }}>Flywheel Pillar 1</span>
            <h2 style={{ fontSize: "2rem" }}>Learning Modules</h2>
          </div>
          
          <EndpointCard method="GET" path="/learn/modules" title="List Available Modules" description="Retrieves gamified micro-learning modules dynamically adjusted by the AI psychometric engine.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Response Schema</h4>
            <CodeBlock code={'{\n  "data": [\n    {\n      "id": "mod_01",\n      "title": "Waste Sorting Basics",\n      "difficulty": 2,\n      "badge_reward": "bronze_env"\n    }\n  ]\n}'} />
          </EndpointCard>

          <EndpointCard method="POST" path="/learn/progress" title="Update Task Progress" description="Syncs offline payload or online progress to the server, triggering the AI difficulty adjustment engine.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Request Body</h4>
            <CodeBlock code={'{\n  "module_id": "mod_01",\n  "completed_steps": 5,\n  "offline_sync": true\n}'} />
          </EndpointCard>

          <EndpointCard method="GET" path="/learn/badges" title="Retrieve Acquired Badges" description="Fetches all Bronze/Silver/Gold badges acquired by the user, including smart contract verification status.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Response Schema</h4>
            <CodeBlock code={'{\n  "badges": [\n    {\n      "type": "silver_civic",\n      "on_chain_tx": "0x88f2...",\n      "verified": true\n    }\n  ]\n}'} />
          </EndpointCard>
        </section>

        {/* 3. IMPACT VERIFICATION */}
        <section id="impact" style={{ marginBottom: "80px" }}>
          <div style={{ borderBottom: "2px solid var(--crimson)", paddingBottom: "16px", marginBottom: "32px" }}>
            <span className="badge" style={{ marginBottom: "12px", background: "rgba(139,26,43,0.2)", color: "var(--crimson)", border: "1px solid var(--crimson)" }}>Flywheel Pillar 2</span>
            <h2 style={{ fontSize: "2rem" }}>Impact Verification</h2>
          </div>
          
          <EndpointCard method="GET" path="/impact/challenges" title="List Community Challenges" description="Fetches active civic, environmental, and health challenges in the Akoka host community. Accepts geo-filter parameters.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Response Schema</h4>
            <CodeBlock code={'{\n  "data": [\n    {\n      "id": "chal_92",\n      "title": "Abule-Oja Drainage Clearing",\n      "category": "environmental",\n      "esusu_reward_pool": 50000\n    }\n  ]\n}'} />
          </EndpointCard>

          <EndpointCard method="POST" path="/impact/circles" title="Create Impact Circle" description="Initializes a new student group (Impact Circle) and prepares an Esusu pool for the project.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Request Body</h4>
            <CodeBlock code={'{\n  "challenge_id": "chal_92",\n  "members": ["did:ethr:0x111", "did:ethr:0x222"]\n}'} />
          </EndpointCard>

          <EndpointCard method="POST" path="/impact/submit-proof" title="Submit Project Proof" description="Uploads multi-modal proof (geo-tagged image, beneficiary sign-off). The AI pre-screens the image before validator review.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Request Body (Multipart Form)</h4>
            <CodeBlock language="shell" code={'curl -X POST https://api.akokasolve.com/v1/impact/submit-proof \\\n  -F "image=@/path/to/proof.jpg" \\\n  -F "challenge_id=chal_92" \\\n  -F "geo_lat=6.5158" \\\n  -F "geo_lng=3.3888"'} />
          </EndpointCard>

          <EndpointCard method="GET" path="/impact/metrics" title="Retrieve IRIS+ Metrics" description="Returns aggregated impact statistics mapped directly to the 571 SDG-aligned IRIS+ indicators.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Response Schema</h4>
            <CodeBlock code={'{\n  "iris_metrics": {\n    "PI1263": 450, // Individuals trained\n    "OD4108": 12   // Hectares of land improved\n  }\n}'} />
          </EndpointCard>
        </section>

        {/* 4. CREDENTIALS & CSR */}
        <section id="credentials" style={{ marginBottom: "80px" }}>
          <div style={{ borderBottom: "2px solid var(--green)", paddingBottom: "16px", marginBottom: "32px" }}>
            <span className="badge" style={{ marginBottom: "12px", background: "rgba(30,138,94,0.2)", color: "var(--green)", border: "1px solid var(--green)" }}>Flywheel Pillar 3</span>
            <h2 style={{ fontSize: "2rem" }}>Credentials & CSR</h2>
          </div>
          
          <EndpointCard method="POST" path="/impact/mint-credits" title="Mint Tradeable Impact Credit" description="Triggered by local validators to mint an immutable Tradeable Impact Credit via Smart Contract.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Request Body</h4>
            <CodeBlock code={'{\n  "proof_id": "prf_881",\n  "validator_signature": "0xdef...",\n  "outcome_hash": "a8f9c2..."\n}'} />
          </EndpointCard>

          <EndpointCard method="GET" path="/credentials/digital-cv" title="Export Digital CV" description="Returns a blockchain-anchored summary of a student's acquired skills and verified impact. Used by employers.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Response Schema</h4>
            <CodeBlock code={'{\n  "did": "did:ethr:0x123...",\n  "total_verified_hours": 120,\n  "certifications": ["civic_leadership", "environmental_waste_mgt"]\n}'} />
          </EndpointCard>

          <EndpointCard method="POST" path="/csr/purchase-credits" title="Purchase Impact Credits" description="Endpoint for Benevity/Groundswell integrations to purchase verified impact credits, instantly routing capital to Esusu wallets.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Request Body</h4>
            <CodeBlock code={'{\n  "funder_id": "benevity_acct_44",\n  "credit_amount": 500,\n  "target_sector": "environmental"\n}'} />
          </EndpointCard>
        </section>

        {/* 5. DIGITAL ESUSU */}
        <section id="esusu" style={{ marginBottom: "80px" }}>
          <div style={{ borderBottom: "2px solid var(--gold)", paddingBottom: "16px", marginBottom: "32px" }}>
            <span className="badge" style={{ marginBottom: "12px", background: "rgba(201,168,76,0.2)", color: "var(--gold)", border: "1px solid var(--gold)" }}>Trust Layer</span>
            <h2 style={{ fontSize: "2rem" }}>Digital Esusu</h2>
          </div>
          
          <EndpointCard method="GET" path="/esusu/pools" title="List Active Esusu Pools" description="Retrieves active decentralized savings pools, showing member count, balance, and next payout schedule.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Response Schema</h4>
            <CodeBlock code={'{\n  "pools": [\n    {\n      "pool_id": "esu_11",\n      "members": 5,\n      "total_balance_ngn": 250000,\n      "next_payout": "2026-08-01T12:00:00Z"\n    }\n  ]\n}'} />
          </EndpointCard>

          <EndpointCard method="POST" path="/esusu/contribute" title="Submit Esusu Contribution" description="Logs an ACID transaction representing a student's micro-contribution to the pool, requiring a 2FA idempotency token.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Request Body</h4>
            <CodeBlock code={'{\n  "pool_id": "esu_11",\n  "amount_ngn": 5000,\n  "idempotency_token": "idmp_a1b2..."\n}'} />
          </EndpointCard>

          <EndpointCard method="GET" path="/esusu/payout-schedule" title="Get Payout Schedule" description="Returns the cryptographically determined smart contract rotation schedule for the pool payouts.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Response Schema</h4>
            <CodeBlock code={'{\n  "schedule": [\n    { "did": "did:ethr:0x111", "date": "2026-08-01" },\n    { "did": "did:ethr:0x222", "date": "2026-09-01" }\n  ]\n}'} />
          </EndpointCard>
        </section>

        {/* 6. INSTITUTIONS */}
        <section id="institutions" style={{ marginBottom: "80px" }}>
          <div style={{ borderBottom: "2px solid rgba(255,255,255,0.2)", paddingBottom: "16px", marginBottom: "32px" }}>
            <span className="badge" style={{ marginBottom: "12px", background: "rgba(255,255,255,0.1)", color: "var(--cream)", border: "1px solid rgba(255,255,255,0.2)" }}>Ecosystem Partners</span>
            <h2 style={{ fontSize: "2rem" }}>Institutions</h2>
          </div>
          
          <EndpointCard method="GET" path="/jobs/match" title="Jobberman Matchmaking" description="Endpoint allowing third-party HR boards to query the psychometric engine for verified candidate matches.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Response Schema</h4>
            <CodeBlock code={'{\n  "matches": [\n    { "did": "did:ethr:0x123...", "match_score": 94 }\n  ]\n}'} />
          </EndpointCard>

          <EndpointCard method="PUT" path="/nysc/status" title="Sync NYSC CDS Status" description="Institutional handshake allowing the National Youth Service Corps to verify Community Development Service (CDS) hours automatically.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Request Body</h4>
            <CodeBlock code={'{\n  "nysc_call_up_number": "NYSC/UNILAG/2026/123456",\n  "cds_hours_logged": 120\n}'} />
          </EndpointCard>

          <EndpointCard method="GET" path="/unilag/profile" title="U-COHUB Mentorship Data" description="Allows university faculty to view academic profile alignment and mentorship progress for students in the hub.">
            <h4 style={{ color: "var(--cream)", marginBottom: "8px", fontSize: "0.875rem", textTransform: "uppercase" }}>Response Schema</h4>
            <CodeBlock code={'{\n  "student_id": "180123456",\n  "faculty": "Engineering",\n  "mentor_did": "did:ethr:0xfaculty..."\n}'} />
          </EndpointCard>
        </section>

      </main>
    </div>
  );
}
