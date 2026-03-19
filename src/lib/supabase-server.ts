import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export const supabaseAdmin: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    if (!_client) {
      if (!process.env.SUPABASE_URL) throw new Error("Missing SUPABASE_URL");
      if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
      _client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    }
    return Reflect.get(_client, prop);
  },
});
