# Akoka Solve Deployment Guide

## Prerequisites
- Node.js v18+
- Docker & Kubernetes (kubectl configured)
- Access to AWS ECR / CI/CD pipelines
- Terraform installed for infra provisioning

## Environment Setup
1. Clone the repository.
2. Run `npm install` at the root to install monorepo dependencies.
3. Configure `.env` files based on `.env.example` in each service.

## Database Migration Steps
Run migrations before deploying new application versions:
```bash
npm run typeorm migration:run -w apps/backend
```
Ensure backups are taken prior to running migrations in production.

## Blue/Green Deployment
1. Deploy the "Green" environment (new version) alongside the "Blue" environment (current version).
2. Run automated integration tests against the Green environment.
3. If successful, update the Kubernetes Ingress/Service selector to route traffic to the Green pods.
4. Monitor metrics for 15 minutes.
5. If stable, scale down the Blue environment.

## Rollback Procedure
If issues are detected after switching traffic:
1. Immediately revert the Ingress/Service selector to route traffic back to the Blue pods.
2. Trigger the rollback pipeline in CI/CD.
3. Document the failure in the Incident Response tracker.
