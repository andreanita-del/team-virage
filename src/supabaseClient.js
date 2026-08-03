import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uvztcbatubeavfjnnnfl.supabase.co'
const supabaseKey = 'sb_publishable_3yn37mYMTL5I3khtKGVK6w_-SdEkH8H'

export const supabase = createClient(supabaseUrl, supabaseKey)
