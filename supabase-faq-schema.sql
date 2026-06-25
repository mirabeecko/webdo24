-- ============================================================
-- Supabase FAQ schema pro WebDo24.cz
-- Vytvoř tabulku v Supabase SQL Editoru a povol RLS
-- ============================================================

-- Vytvoření tabulky FAQ
CREATE TABLE IF NOT EXISTS faq (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL DEFAULT 'index',
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index pro rychlé filtrování podle kategorie a řazení
CREATE INDEX IF NOT EXISTS idx_faq_category_active ON faq(category, is_active, sort_order);

-- Povolení Row Level Security
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;

-- Politika: kdokoli může číst aktivní FAQ (pro veřejný web)
CREATE POLICY "Allow public read FAQ" ON faq
  FOR SELECT USING (is_active = true);

-- Politika: jen autentizovaní uživatelé mohou měnit data (uprav podle potřeby)
CREATE POLICY "Allow authenticated write FAQ" ON faq
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
