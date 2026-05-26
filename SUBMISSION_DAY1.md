# Day 1 Submission — Stacklet Launchpad

## Summary

Stacklet is a fictional SaaS landing page for ops teams that need internal workflow tools without waiting on engineering. The Day 1 deliverable is a polished landing page with business positioning, pricing, FAQ, a Supabase-backed waitlist, deploy links, and sprint documentation.

## Primary Submission Links

| Item | Link |
| --- | --- |
| Live app | https://stacklet-sprint-day1-samariddin.netlify.app |
| GitHub repo | https://github.com/Samariddin-Paritdinov/stacklet-launchpad |
| Loom demo | https://www.loom.com/share/dbf86f39dcbd4c2c8efdff34cbbf72eb |
| Business analysis | https://github.com/Samariddin-Paritdinov/stacklet-launchpad/blob/main/BUSINESS.md |
| Technical/product decisions | https://github.com/Samariddin-Paritdinov/stacklet-launchpad/blob/main/DECISIONS.md |
| Lovable prompt log | https://github.com/Samariddin-Paritdinov/stacklet-launchpad/blob/main/docs/prompts/lovable-day1-export.md |

## What Was Built

- Sticky navigation with in-page links to Features, Pricing, FAQ, and Waitlist.
- Hero section with clear ICP, product promise, primary CTA, secondary pricing CTA, and product UI preview.
- Six feature cards focused on operations workflows, guarded permissions, Supabase/Postgres data, templates, approvals, and rollout safety.
- Three pricing tiers: Starter, Team, Scale, using workspace-based pricing.
- Five FAQ items that answer buyer objections around Retool, non-technical ops builders, data ownership, pricing, and early-product limitations.
- Waitlist form with required work email, required role, optional company, client-side validation, Supabase insert, duplicate-email handling, success state, form clear, and 3-second cooldown.
- Supabase waitlist table with RLS: anonymous users can insert only; anonymous users cannot select, update, or delete rows.
- Netlify production deploy as fallback because Vercel signup was blocked.

## Supabase Setup

The app uses public browser-safe Supabase variables only:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

No service role key is used or committed.

Relevant SQL migrations:

- `supabase/migrations/20260526053435_0e58f266-98ad-41c0-a675-2f5a2c876f0c.sql`
- `supabase/migrations/20260526053459_8114b83f-a4ee-4118-850c-9c0037366877.sql`
- `supabase/migrations/20260526060000_day1_waitlist_hardening.sql`

Verified on May 26, 2026:

- Live site returns HTTP 200.
- Netlify production deploy succeeds.
- Headless browser submitted the live waitlist form successfully.
- Success message shown: `You're on the list. We'll email you when your wave opens up — usually within two weeks.`

## Verification Commands

```bash
npm run lint
npm run build:netlify
curl -I https://stacklet-sprint-day1-samariddin.netlify.app
```

Latest verification result:

- `npm run lint`: passed with existing Fast Refresh warnings from shadcn-style UI exports.
- `npm run build:netlify`: passed.
- Live URL: HTTP 200.
- Live waitlist submit: passed.

## Business Reasoning

Primary user: operations leads at 50-500 person B2B SaaS companies.

Problem: these teams wait too long for engineering to build small internal tools, so they run approvals and admin work through spreadsheets, Airtable, Slack, and manual handoffs.

Positioning: Stacklet is not a generic no-code app builder. It is an ops-first workflow tool builder for secure approval flows and internal admin workflows on top of Supabase/Postgres.

Competitor framing:

- Retool is stronger for engineer-owned internal apps.
- Airtable Interfaces is easier for non-technical teams but weaker for production database workflows and granular permissions.
- Spreadsheets plus Zapier are cheap initially but brittle and hard to audit.

Pricing hypothesis:

- Starter: $39/mo per workspace.
- Team: $129/mo per workspace.
- Scale: $399/mo per workspace.

The pricing is workspace-based because internal tools need broad usage by occasional users; per-seat pricing discourages teams from inviting everyone who needs the workflow.

## Known Deviations / Disclosure

- The sprint brief preferred Vercel, but Vercel signup was blocked. Netlify was used as the production fallback and the repo includes `netlify.toml`.
- Lovable was used for the first three prompts. Lovable daily limit was reached, so final Supabase hardening, docs, Netlify static deployment, and QA were completed in Codex.
- The Lovable prompt log contains the prompts and summarized results. Exact exported Lovable transcript should replace the summary if Lovable export becomes available.

## Grading Self-Assessment

Likely score: 8/10 to 9/10.

Why it should score strong:

- Clean production build.
- Live deployed landing page.
- Supabase waitlist works.
- Business reasoning is clear and documented.
- Loom demo link is included.
- Repo includes README, BUSINESS, DECISIONS, prompt log, migrations, and deploy config.

Why it is not a guaranteed 10:

- Netlify is used instead of Vercel because Vercel signup was blocked.
- Lovable exact transcript is not fully exported; prompt log is reconstructed from the work completed before the Lovable daily limit.

## Spreadsheet-Friendly Single Row

```csv
Day,Project,Live URL,GitHub URL,Loom URL,Business Doc,Decisions Doc,Prompt Log,Status,Notes
1,Stacklet Launchpad,https://stacklet-sprint-day1-samariddin.netlify.app,https://github.com/Samariddin-Paritdinov/stacklet-launchpad,https://www.loom.com/share/dbf86f39dcbd4c2c8efdff34cbbf72eb,https://github.com/Samariddin-Paritdinov/stacklet-launchpad/blob/main/BUSINESS.md,https://github.com/Samariddin-Paritdinov/stacklet-launchpad/blob/main/DECISIONS.md,https://github.com/Samariddin-Paritdinov/stacklet-launchpad/blob/main/docs/prompts/lovable-day1-export.md,Submitted and verified,Netlify used because Vercel signup was blocked; live waitlist submit verified May 26 2026
```
