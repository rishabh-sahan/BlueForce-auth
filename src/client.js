import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hycpwoqqzavtnhxvzpzg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5Y3B3b3FxemF2dG5oeHZ6cHpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NDgxNzUsImV4cCI6MjA2NjUyNDE3NX0.sVBpch9bQpezdLUY3gOeBt9GtYty9-e8RdulnxP7qgA';
export const supabase = createClient(supabaseUrl, supabaseKey)