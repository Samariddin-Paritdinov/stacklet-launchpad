# Stacklet Launchpad

Stacklet is a fictional no-code internal-tools builder for operations teams at 50-500 person B2B SaaS companies. These teams are stuck with spreadsheets, Airtable workarounds, Slack approvals, and engineering queues; Stacklet positions itself as a faster, governed way to ship approval flows, admin panels, and workflow trackers on top of Supabase or Postgres.

## Live URL

https://stacklet-sprint-day1-samariddin.netlify.app

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Environment variables:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Lovable may use `VITE_SUPABASE_PUBLISHABLE_KEY`; the app accepts that too, but `VITE_SUPABASE_ANON_KEY` is listed here because the sprint brief asks for anon-key setup.

## Supabase

Run the SQL migrations in `supabase/migrations/` or create the same table manually:

```sql
create extension if not exists "uuid-ossp";

create table public.waitlist (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  role text not null,
  company text,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

create policy "Anon can join waitlist"
  on public.waitlist
  for insert
  to anon
  with check (
    char_length(email) between 3 and 254
    and email like '%_@_%.__%'
    and char_length(role) between 1 and 80
    and (company is null or char_length(company) <= 200)
  );

revoke select on public.waitlist from anon;
revoke update on public.waitlist from anon;
revoke delete on public.waitlist from anon;
grant insert on public.waitlist to anon;
```

## Netlify fallback

The brief asks for Vercel, but if Vercel signup is blocked this repo includes a Netlify fallback:

```bash
netlify deploy --build --prod
```

Netlify uses `npm run build:netlify`, which builds the single landing page as a plain static Vite app from `index.html`.

Set the same environment variables in Netlify before testing the waitlist form:

```bash
netlify env:set VITE_SUPABASE_URL "https://your-project-ref.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "your-anon-public-key"
```

## Features

- ✅ Sticky nav with Features, Pricing, FAQ, and Join waitlist CTA.
- ✅ Hero with primary/secondary CTAs and product UI preview.
- ✅ Six feature cards with lucide-react icons.
- ✅ Three pricing tiers with Team highlighted.
- ✅ Five buyer-objection FAQ items.
- ✅ Waitlist form with email, role dropdown, optional company, client-side validation, success state, form clear, and 3-second cooldown.
- ✅ Duplicate email shows "You're already on the list."
- ✅ Supabase migration for anon insert-only waitlist rows.
- 🚧 Live Supabase row verification requires project env vars to be configured in the deploy host.
- 🚧 Netlify fallback is configured because Vercel signup is blocked.
- ✅ Loom demo link recorded and added.

## Known Issues / Next

- Add a final live URL after deployment.
- Add the required 60-90 second Loom demo link.
- Export or paste the full Lovable chat transcript into `docs/prompts/` if Lovable's export tool becomes available again.
- If submitting Netlify instead of Vercel, disclose the Vercel signup blocker.

## Hours Spent

4.5 hours.

## Links

- [Business analysis](./BUSINESS.md)
- [Decisions](./DECISIONS.md)
- [Lovable prompt log](./docs/prompts/lovable-day1-export.md)

## Loom

https://www.loom.com/share/dbf86f39dcbd4c2c8efdff34cbbf72eb
