create extension if not exists "uuid-ossp";

alter table public.waitlist
  alter column id set default uuid_generate_v4();

alter table public.waitlist enable row level security;

drop policy if exists "Anyone can join the waitlist" on public.waitlist;

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
