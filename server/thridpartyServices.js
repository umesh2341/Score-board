import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js'
// import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.SUPABASE_URL)
export const dbService= createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY);
