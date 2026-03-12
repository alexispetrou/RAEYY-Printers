// Αντιγράψτε αυτό το αρχείο σε app-config.js και συμπληρώστε τις τιμές.
// Το app-config.js δεν ανεβαίνει υποχρεωτικά στο public repo αν δεν θέλετε.
window.CLOUD_CONFIG = {
  enabled: true,
  supabaseUrl: 'https://YOUR_PROJECT_ID.supabase.co',
  supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY',
  table: 'app_state',
  rowId: 1,
  pollIntervalMs: 5000
};
