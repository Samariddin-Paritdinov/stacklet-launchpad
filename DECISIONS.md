# Decisions — Day 1

## Lovable usage

- Lovable was used for the initial landing generation and layout/copy iteration.
- Lovable daily limit was reached after three prompts, so final Supabase hardening, documentation, and deployment cleanup were completed in Codex.

## Product positioning

- Stacklet is positioned for operations leads, not developers.
- That keeps the copy focused on approval lanes, permission guardrails, and workspace pricing instead of generic no-code claims.

## Pricing

- Workspace pricing was chosen because internal tools need broad adoption across occasional users.
- A per-seat model would make support, finance, and CS managers hesitate before inviting the people who actually need the tool.

## Technical choices

- Lovable generated a TanStack/React Start TypeScript app with Tailwind and shadcn-style components.
- Supabase is used from the client with the public anon key only.
- RLS allows anonymous inserts into `waitlist` but no public reads, updates, or deletes.
- The client accepts both `VITE_SUPABASE_ANON_KEY` and Lovable's `VITE_SUPABASE_PUBLISHABLE_KEY` naming so the project works in Lovable and in ordinary deploy hosts.

## Cut for time

- No real builder, auth, analytics, billing, or email confirmation.
- No Vercel deployment because Vercel signup was blocked; Netlify can be used as a static fallback if Mubina accepts the deviation.
