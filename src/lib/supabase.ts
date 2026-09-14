// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// İstemci tarafı (takvimde dolu saatleri okuma)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sunucu tarafı (rezervasyon ekleme, onaylama, RLS bypass)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);