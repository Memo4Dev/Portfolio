-- ============================================
-- Portfolio Database Schema for Supabase
-- Run this in the Supabase SQL Editor
-- ============================================

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  Title TEXT NOT NULL DEFAULT '',
  Img TEXT NOT NULL DEFAULT '',
  Link TEXT NOT NULL DEFAULT '',
  Github TEXT NOT NULL DEFAULT '',
  Description TEXT NOT NULL DEFAULT '',
  TechStack JSONB NOT NULL DEFAULT '[]'::jsonb,
  Features JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  img TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for sorted queries
CREATE INDEX IF NOT EXISTS idx_projects_sort ON projects (sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_certificates_sort ON certificates (sort_order ASC);

-- Row Level Security (RLS)
-- Enable RLS on both tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view)
CREATE POLICY "Public read access for projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Public read access for certificates"
  ON certificates FOR SELECT
  USING (true);

-- Full access for authenticated service role (server-side only)
-- The Express backend uses the service_role key, bypassing RLS
-- If you want to restrict admin writes, replace with auth-specific policies:
-- CREATE POLICY "Admin insert projects"
--   ON projects FOR INSERT
--   WITH CHECK (auth.role() = 'service_role');
--
-- CREATE POLICY "Admin update projects"
--   ON projects FOR UPDATE
--   USING (auth.role() = 'service_role');
--
-- CREATE POLICY "Admin delete projects"
--   ON projects FOR DELETE
--   USING (auth.role() = 'service_role');
