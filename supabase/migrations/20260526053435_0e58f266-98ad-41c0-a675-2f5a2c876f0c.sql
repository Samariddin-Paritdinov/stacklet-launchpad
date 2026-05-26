create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null,
  company text,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Allow anyone (including unauthenticated visitors) to add themselves to the waitlist.
create policy "Anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (true);

-- No SELECT / UPDATE / DELETE policies => frontend cannot read or modify rows.