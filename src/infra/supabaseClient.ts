import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://ljgtwhzobcvghjowvitv.supabase.co'
const supabaseKey = process.env.PUBLIC_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase