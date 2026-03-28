import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase-types';

let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabase() {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase client environment variables are missing.');
  }

  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);

  return supabaseClient;
}
