// public/auth.js
import { supabase } from '../lib/supabaseClient.js'

const signupBtn = document.getElementById('signup')
const loginBtn = document.getElementById('login')
const message = document.getElementById('message')

signupBtn.addEventListener('click', async () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    message.textContent = `❌ Signup failed: ${error.message}`
  } else {
    message.textContent = '✅ Signup successful! Check your email to confirm.'
  }
})

loginBtn.addEventListener('click', async () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    message.textContent = `❌ Login failed: ${error.message}`
  } else {
    message.textContent = '✅ Login successful! Redirecting...'
    console.log('Redirecting to dashboard...')
    setTimeout(() => {
      window.location.href = './dashboard.html'
    }, 1000)
  }
})
