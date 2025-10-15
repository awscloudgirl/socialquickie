// testAuth.js
import { supabase } from './lib/supabaseClient.js'

// set a test email you control (you'll get a confirmation email if email confirmations are enabled)
const TEST_EMAIL = 'thatoffgridlife@gmail.com'
const TEST_PASSWORD = 'password123'

// run ONE at a time. Start with signUp(), then comment it and run signIn().
async function signUp() {
  const { data, error } = await supabase.auth.signUp({
    email: TEST_EMAIL,
    password: TEST_PASSWORD
  })
  console.log('Signup data:', data)
  console.log('Signup error:', error)
}

async function signIn() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: TEST_EMAIL,
    password: TEST_PASSWORD
  })
  console.log('Login data:', data)
  console.log('Login error:', error)
}

await signUp()
await signIn()