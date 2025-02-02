import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  "https://hmjvnrnqtnjzariitzdd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtanZucm5xdG5qemFyaWl0emRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4NjY5NDgsImV4cCI6MjA1MzQ0Mjk0OH0.1TuqCH0V2nFS_X1yfTPksCK7c4vxj9ShiTJkcV-1bJc",
)
