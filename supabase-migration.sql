-- webdo24.cz — kompletní migrace
-- Spustit v Supabase Dashboard → SQL Editor

-- ─── Zákazníci ────────────────────────────────────────────────────────────
create table if not exists webdo24_customers (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null unique,
  phone      text not null,
  company    text,
  created_at timestamptz default now()
);

-- ─── Objednávky ───────────────────────────────────────────────────────────
create table if not exists webdo24_orders (
  id                   uuid primary key default gen_random_uuid(),
  customer_id          uuid references webdo24_customers(id) on delete cascade,
  package_id           text not null,
  package_name         text not null,
  total_price          integer not null,
  deposit_amount       integer not null,
  remaining_amount     integer not null default 0,
  status               text not null default 'pending_payment',
  industry             text,
  business_description text,
  design_style         text,
  design_inspiration   text,
  has_logo             text,
  has_texts            text,
  has_photos           text,
  note                 text,
  deposit_paid_at      timestamptz,
  created_at           timestamptz default now()
);

-- ─── Platby ───────────────────────────────────────────────────────────────
create table if not exists webdo24_payments (
  id                       uuid primary key default gen_random_uuid(),
  order_id                 uuid references webdo24_orders(id) on delete cascade,
  stripe_session_id        text not null,
  stripe_payment_intent_id text,
  amount                   integer not null,
  currency                 text not null default 'czk',
  type                     text not null default 'deposit',
  status                   text not null default 'pending',
  paid_at                  timestamptz,
  created_at               timestamptz default now()
);

-- ─── Projekty ─────────────────────────────────────────────────────────────
create table if not exists webdo24_projects (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid references webdo24_orders(id) on delete cascade,
  status     text not null default 'waiting',
  started_at timestamptz,
  created_at timestamptz default now()
);

-- ─── RLS (přístup pouze přes service role key) ───────────────────────────
alter table webdo24_customers enable row level security;
alter table webdo24_orders    enable row level security;
alter table webdo24_payments  enable row level security;
alter table webdo24_projects  enable row level security;
