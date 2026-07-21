import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function mapProjectRow(row) {
  if (!row) return row;
  return {
    ...row,
    Title: row.title,
    Img: row.img,
    Link: row.link,
    Github: row.github,
    Description: row.description,
    TechStack: row.techstack,
    Features: row.features,
  };
}
