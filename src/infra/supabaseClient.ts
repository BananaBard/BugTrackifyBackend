import {createClient} from '@supabase/supabase-js'
import { configDotenv } from 'dotenv'
import { Database } from '../supabase'

configDotenv()


const supabaseUrl = 'https://ljgtwhzobcvghjowvitv.supabase.co'
const supabaseKey = process.env.PUBLIC_KEY!
const supabase = createClient<Database>(supabaseUrl, supabaseKey)
const supabaseAdminKey = process.env.SECRET_KEY!

const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseAdminKey)

export default supabase
export {supabaseAdmin}