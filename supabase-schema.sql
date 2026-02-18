-- Execute este SQL no Supabase (SQL Editor) para criar a tabela de confirmações.
-- Dashboard Supabase: https://supabase.com/dashboard -> seu projeto -> SQL Editor

create table if not exists public.confirmacoes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  guests text not null default '1',
  attendance text not null check (attendance in ('sim', 'nao')),
  dietary text,
  created_at timestamptz not null default now()
);

-- Opcional: desabilitar RLS ou criar política. Como a API usa service role, não precisa de política para o app.
