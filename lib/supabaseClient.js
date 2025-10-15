// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lydhcxsselkywukhtlak.supabase.co'
const supabaseAnonKey = 'sb_publishable_sa5YpeQDZfXXRIVF8NE5ew_EaHtwsX5'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)