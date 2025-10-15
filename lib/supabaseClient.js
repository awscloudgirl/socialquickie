// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load .env.local when running in Node scripts
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase env vars. Check .env.local')
  process.exit(1)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)