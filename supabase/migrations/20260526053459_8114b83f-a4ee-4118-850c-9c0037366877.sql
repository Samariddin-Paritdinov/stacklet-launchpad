drop policy if exists "Anyone can join the waitlist" on public.waitlist;

create policy "Anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (
    char_length(email) between 3 and 254
    and email like '%_@_%.__%'
    and char_length(role) between 1 and 80
    and (company is null or char_length(company) <= 200)
  );