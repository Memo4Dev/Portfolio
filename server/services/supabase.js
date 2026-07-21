import { createClient } from '@supabase/supabase-js';

let _supabase = null;

export function getSupabase() {
  if (_supabase) return _supabase;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('[Supabase] Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env');
  }

  _supabase = createClient(url, key);
  return _supabase;
}
