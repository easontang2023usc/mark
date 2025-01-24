import { createClient } from "@supabase/supabase-js";

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Ensure the environment variables are defined
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables: Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your .env.local file."
  );
}

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
