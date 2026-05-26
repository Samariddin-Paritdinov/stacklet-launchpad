# Business Analysis — Day 1

## Who is this for?

- Primary user persona: Operations leads at 50-500 person B2B SaaS companies who own support, finance, RevOps, or customer admin workflows.
- They use spreadsheets, Airtable, Slack approvals, and engineering favors because small internal tools rarely win sprint priority.
- They would use Stacklet because it gives ops teams guarded workflow tools on top of Postgres/Supabase without Retool-style developer ownership or per-seat rollout friction.

## What problem does it solve?

- Job-to-be-done: Launch a secure internal workflow tool in one afternoon without waiting on the engineering queue.
- Cost of not solving it: 5-10 engineering hours per small tool, refund/admin mistakes, delayed customer workflows, and spreadsheet processes that are hard to audit.

## Success metrics

- Activation: % of signups who publish their first workflow within 24 hours.
- Engagement: Weekly active builders and weekly active workflow users per workspace.
- Retention: Week 4 workspace retention and number of live workflows still used after 30 days.
- Revenue/value driver: Paid workspace conversion and estimated engineering hours saved per workspace.

## Monetization or business model

- Workspace pricing: Starter $39/mo, Team $129/mo, Scale $399/mo.
- This avoids invite anxiety because internal tools need many occasional users.
- Rough unit economics: assumed monthly infra/support cost is $6 Starter, $18 Team, and $55 Scale, leaving 84%+ gross margin before acquisition cost.

## Competitors / alternatives

- Retool: more powerful for engineer-owned internal apps, but heavier and more expensive for ops-owned workflows.
- Airtable Interfaces: easy for non-technical teams, but weaker for production database workflows and granular operational permissions.
- Spreadsheets + Zapier: cheap initially, but brittle, hard to audit, and risky for approval workflows.

## Scope tradeoffs

- Cut for Day 1: real app builder, auth, templates, billing, and workspace management.
- Right cut: the sprint asks for demand capture and business positioning, so the landing page and waitlist prove the wedge first.
- Next 3: interactive builder demo, template gallery, and workspace invite flow.

## Risks

- Technical risk: real buyers may need complex RBAC, audit logs, and integration depth earlier than planned.
- Market risk: Retool, Airtable, or Glide can package a simpler ops-facing tier and erase the positioning gap.
