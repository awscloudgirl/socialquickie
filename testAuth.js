// testAuth.js
import { supabase } from './lib/supabaseClient.node.js'

const TEST_EMAIL = 'helloworld@gmail.com'
const TEST_PASSWORD = 'password123'

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

// Run ONE at a time:
// await signUp()
 await signIn()