// ================================
// SUPABASE CONFIG
// ================================

// Paste your Project URL here
const SUPABASE_URL = "https://gaymixxpsnllapithkab.supabase.co";

// Paste your Anon Public Key here
const SUPABASE_ANON_KEY = "sb_publishable__flRiY_ZGQg5VkbkmtsbSw_m9Z0dn5o";

// Initialize Supabase
const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
