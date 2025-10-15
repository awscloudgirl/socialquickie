import { supabase } from './lib/supabaseClient.js'

// Signup
const signupForm = document.getElementById('signupForm')
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.getElementById('signupEmail').value
  const password = document.getElementById('signupPassword').value
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) alert('Signup error: ' + error.message)
  else alert('Signup successful! Check your email if confirmation is on.')
})

// Login
const loginForm = document.getElementById('loginForm')
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.getElementById('loginEmail').value
  const password = document.getElementById('loginPassword').value
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) alert('Login error: ' + error.message)
  else showUser(data.user)
})

// Show user + logout
const userBox = document.getElementById('userBox')
const userEmail = document.getElementById('userEmail')
const logoutBtn = document.getElementById('logoutBtn')

function showUser(user) {
  userEmail.textContent = user.email
  userBox.style.display = 'block'
  signupForm.style.display = 'none'
  loginForm.style.display = 'none'
}

logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut()
  userBox.style.display = 'none'
  signupForm.style.display = 'block'
  loginForm.style.display = 'block'
  alert('Logged out')
})

// Check session on page load
async function checkSession() {
  const { data } = await supabase.auth.getSession()
  if (data.session) showUser(data.session.user)
}
checkSession()