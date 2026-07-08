const SUPABASE_URL = "https://gaymixxpsnllapithkab.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdheW1peHhwc25sbGFwaXRoa2FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0Mzg1NzMsImV4cCI6MjA5OTAxNDU3M30._c9AQ6Wj7IQGNKTp_C3UP8AmlrkSOzfQgwIK5KSwC0E";

window.db = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
