import { createClient } from '@supabase/supabase-js';

let supabaseClient: ReturnType<typeof createClient<any>> | null = null;

export function getSupabase() {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase client environment variables are missing.');
  }

  supabaseClient = createClient<any>(supabaseUrl, supabaseAnonKey);

  return supabaseClient;
}
