// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseUrl = 'http://47.97.196.187:8000'
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzUzNzE4NDAwLCJleHAiOjE5MTE0ODQ4MDB9.YzWCjdYyR1CaL7NVYmJXFDA0kzZE00Iq2pt0Dsk-GUU'

let supabaseInstance: any = null

export function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseKey)
  }
  return supabaseInstance
}
