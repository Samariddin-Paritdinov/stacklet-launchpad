# Lovable Prompt Log — Day 1 Stacklet

Note: Lovable was used for the first three prompts. The daily limit was reached after Prompt 3, so the remaining Supabase hardening, docs, and deployment cleanup were completed in Codex.

Replace the response summaries below with the exact exported Lovable transcript if export becomes available.

## Prompt 1 — Initial Build

Build a production-ready single-page SaaS marketing landing page for a fictional product called Stacklet.

Stacklet is a no-code internal-tools builder for operations teams at 50-500 person B2B SaaS companies. The ICP is operations leads, RevOps, customer support ops, and finance ops teams who are stuck using spreadsheets and waiting for engineering to build small internal tools.

Use React + Vite + TypeScript + Tailwind CSS. Use lucide-react icons.

The page must include sticky nav, hero, six feature cards, three pricing tiers, five FAQ items, waitlist form, and footer. The form must include required email, required role dropdown, optional company, client-side email validation, success state, form clear after success, 3-second disabled submit state, and friendly duplicate email handling.

Design it to look intentional at 375px, 768px, and 1440px. Avoid generic AI filler copy. Keep the landing copy consistent with ops-owned internal workflows, workspace pricing, and a cheaper/easier Retool alternative.

## Lovable Response 1 — Summary

Lovable generated the Stacklet landing page with a sticky nav, hero, product preview, feature grid, pricing section, FAQ section, waitlist form, and footer.

## Prompt 2 — Business Consistency Pass

Review the landing page copy and make sure every section matches this BUSINESS.md strategy.

Business strategy:

- Primary user: Operations leads at 50-500 person B2B SaaS companies.
- Pain: They wait too long for engineering to build small internal tools, so they use spreadsheets, Airtable, and manual handoffs.
- Job-to-be-done: Launch a secure internal workflow tool in one afternoon.
- Main alternatives: Retool, Airtable Interfaces, spreadsheets + Zapier.
- Stacklet wedge: workspace-based pricing, ops-first templates, guarded permissions, approval lanes.
- Pricing hypothesis: Starter $39/mo, Team $129/mo, Scale $399/mo.
- Retool comparison: Retool is more powerful for developers; Stacklet is simpler and cheaper for ops-owned workflows.

Improve any generic or vague copy. Make FAQ objections sound like real buyer objections. Do not add new sections unless needed.

## Lovable Response 2 — Summary

Lovable refined the page positioning around ops teams, Retool comparison, workspace pricing, approval lanes, and Supabase/Postgres workflows.

## Prompt 3 — Supabase Waitlist Integration

Integrate the waitlist form with Supabase.

Use a public table named waitlist with this schema:

- id uuid primary key default uuid_generate_v4()
- email text not null unique
- role text not null
- company text nullable
- created_at timestamptz default now()

Requirements:

- Use Supabase client from @supabase/supabase-js.
- Read VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from environment variables.
- Insert email, role, and company into public.waitlist.
- Trim and lowercase email before insert.
- If Supabase returns duplicate email error code 23505, show: "You're already on the list."
- For other errors, show a friendly generic error.
- If successful, show confirmation message, clear form, and disable submit button for 3 seconds.
- Do not expose service role key.
- Do not allow selecting waitlist rows from the frontend.

## Lovable Response 3 — Summary

Lovable added Supabase client files, waitlist migrations, typed waitlist schema, and a client-side waitlist insert flow with validation and duplicate handling.

## Prompt 4 — Required Repo Docs

Create the required sprint documentation files in the repo: README.md, BUSINESS.md, and DECISIONS.md.

README.md must include a problem statement, setup steps, environment variable names without secrets, feature list with status, known issues, hours spent, links to BUSINESS.md and DECISIONS.md, a Loom placeholder, and a live URL placeholder.

BUSINESS.md must follow the Day 1 business template and stay short, specific, and bullet-based.

DECISIONS.md must explain Stacklet's ops positioning, workspace pricing, React/TanStack + Tailwind technical choice, Supabase RLS insert-only model, Lovable daily limit, and what was cut for time.

## Result 4

Completed in Codex after Lovable daily limit.

## Prompt 5 — Final QA

Run a final acceptance pass against the Day 1 sprint brief.

Check sticky nav, anchor links, hero CTAs, exactly six feature cards, exactly three pricing tiers, exactly five FAQ questions, waitlist fields, client-side email validation, Supabase insert, duplicate email messaging, success state, form clear, 3-second cooldown, responsive layout, required docs, and no committed secrets.

## Result 5

Completed in Codex after Lovable daily limit.
