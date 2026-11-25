-- Execute no SQL Editor do Supabase (veja docs/SYNC.md).
create table if not exists public.docs (
  room       text        not null,          -- código da sala
  key        text        not null,          -- "char:<id>", "meta", "log", "pend"
  data       jsonb       not null,
  updated_at timestamptz not null default now(),
  primary key (room, key)
);
alter table public.docs enable row level security;
create policy "docs_anon_all" on public.docs for all to anon using (true) with check (true);
alter publication supabase_realtime add table public.docs;
