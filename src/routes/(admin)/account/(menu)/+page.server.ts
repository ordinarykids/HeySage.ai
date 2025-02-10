import { redirect } from "@sveltejs/kit"

// import { supabase } from "$lib/supabaseClient"

import { createClient } from "@supabase/supabase-js"
import type { PageServerLoad } from "./$types"
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "$env/static/private"

import { load_helper } from "$lib/load_helpers"

// Initialize the Supabase client with your credentials.
const supabase = createClient(
  "https://hmjvnrnqtnjzariitzdd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtanZucm5xdG5qemFyaWl0emRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4NjY5NDgsImV4cCI6MjA1MzQ0Mjk0OH0.1TuqCH0V2nFS_X1yfTPksCK7c4vxj9ShiTJkcV-1bJc",
)

const loadUser: PageServerLoad = async ({ data }) => {
  const { session, user } = await load_helper(data.session, supabase)
  if (!session || !user) {
    console.log("No session or user")
  }

  console.log(user)
  load2()
}

export const load: PageServerLoad = async () => {
  // Define the userId you want to query. This could come from the session, URL params, etc.
  const userId = "878a5be6-70b6-46bc-9631-752fe52c1a45"

  // Query the "conversations" table for the given userId and return the last 100 messages.
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("userId", userId)
    .order("created_at", { ascending: false })
    .limit(1000)

  // Basic error handling. You can customize this as needed.
  if (error) {
    console.error("Error fetching conversations:", error)
    throw new Error("Could not load conversations")
  }

  // Return the data, which will be available as props in your page component.
  return {
    conversations: data,
  }
}

// let stuff = "stuffasdasdasd"

// export async function load() {
//   return {
//     stuff,
//   }
// }

export const actions = {
  signout: async ({ locals: { supabase, safeGetSession } }) => {
    const { session } = await safeGetSession()
    if (session) {
      await supabase.auth.signOut()
      redirect(303, "/")
    }
  },
}
