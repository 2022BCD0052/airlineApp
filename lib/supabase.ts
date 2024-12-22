import AsyncStorage from '@react-native-async-storage/async-storage'; // Default import
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = ""; // Your Supabase URL
const supabaseAnonKey = ""; // Your Supabase Anon Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // Pass the default export
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
