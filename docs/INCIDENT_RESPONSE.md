# Akoka Solve Incident Response Runbook

## Severity Levels
- **P1 (Critical):** Complete system outage or data breach. Immediate all-hands response. Target Response: 15 mins.
- **P2 (High):** Core functionality degraded (e.g., login failing). Target Response: 30 mins.
- **P3 (Medium):** Non-critical feature broken, workarounds exist. Target Response: 4 hours.
- **P4 (Low):** Minor bug or cosmetic issue. Addressed in normal sprint cycle.

## Escalation Paths
1. On-call Engineer receives alert (via PagerDuty).
2. If P1/P2, On-call Engineer escalates to Engineering Manager within 15 mins.
3. Engineering Manager notifies CTO and establishes a "War Room" (Slack/Zoom).
4. Customer Success informed for external communication.

## Communication Templates
### P1 Outage (External)
**Subject:** [Action Required] Akoka Solve System Outage
**Body:** We are currently experiencing a system-wide outage affecting all services. Our engineering team is actively investigating the issue. We will provide updates every 30 minutes on our status page.

## Post-Mortem Template
- **Date of Incident:**
- **Authors:**
- **Incident Summary:**
- **Timeline:**
- **Root Cause:**
- **Resolution:**
- **Action Items (Preventative Measures):**
