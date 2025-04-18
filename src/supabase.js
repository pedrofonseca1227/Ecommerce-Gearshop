import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fcrffsmpszjqszahnhrt.supabase.co' // substitua pelo seu
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjcmZmc21wc3pqcXN6YWhuaHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5Mzg3NTgsImV4cCI6MjA2MDUxNDc1OH0.d6UHKSq73Etd1InkYX60D4hHvooc1kGrR-ybmAUl47Y' // substitua pela sua chave

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
