// lib/supabaseClient.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// These are safe to expose in the browser (anon key + public URL).
const supabaseUrl = 'https://lydhcxsselkywukhtlak.supabase.co'
const supabaseAnonKey = 'sb_publishable_sa5YpeQDZfXXRIVF8NE5ew_EaHtwsX5'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)