import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_BANANA_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_BANANA_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
