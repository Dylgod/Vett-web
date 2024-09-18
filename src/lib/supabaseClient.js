import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://hssxcigcqdckceoutxpl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhzc3hjaWdjcWRja2Nlb3V0eHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzNTE4MDIsImV4cCI6MjA0MTkyNzgwMn0.RAdAiwhEob-TzWt7ncBBp-d1myNFTR4tp-fPUedjv9Y')