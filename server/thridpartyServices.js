import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config();
export const dbService= createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_DEFAULT_KEY);
