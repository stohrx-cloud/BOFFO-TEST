// ─────────────────────────────────────────────────────────────────────────────
// supabase-config.js — shared Supabase client for all Boffo's pages
//
// SETUP (one time):
//   1. Supabase dashboard → Project Settings → API
//   2. Copy "Project URL"      → paste into SUPABASE_URL below
//   3. Copy "anon public" key  → paste into SUPABASE_ANON_KEY below
//
// The anon key is safe to ship in frontend code — it only grants what the
// Row Level Security policies allow. NEVER put the service_role key here.
//
// Every page loads this after the Supabase CDN script:
//   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
//   <script src="supabase-config.js"></script>
// and then uses the global `sb` client.
// ─────────────────────────────────────────────────────────────────────────────

const SUPABASE_URL      = 'https://ttxvttyxzsnrvfmntzvy.supabase.co';      // e.g. https://abcdefgh.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0eHZ0dHl4enNucnZmbW50enZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NjMxMTYsImV4cCI6MjEwMDIzOTExNn0._DBZeJMrJKr2L3buh5A_puDRKwSY1AcZ3pq4HHTsJ1g';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
