// lib/supabaseClient.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// These are safe to expose in the browser
const supabaseUrl = 'https://lydhcxsselkywukhtlak.supabase.co'
const supabaseAnonKey = 'sb_publishable_sa5YpeQDZfXXRIVF8NE5ew_EaHtwsX5'

// Export browser client (for dashboard, auth, public pages)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)