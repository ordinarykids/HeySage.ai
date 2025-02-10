import { redirect } from "@sveltejs/kit"

// import { supabase } from "$lib/supabaseClient"

import type { PageServerLoad } from "./$types"
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "$env/static/private"

import { load_helper } from "$lib/load_helpers"

// Initialize the Supabase client with your credentials.
// const supabase = createClient(
//   "https://hmjvnrnqtnjzariitzdd.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtanZucm5xdG5qemFyaWl0emRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4NjY5NDgsImV4cCI6MjA1MzQ0Mjk0OH0.1TuqCH0V2nFS_X1yfTPksCK7c4vxj9ShiTJkcV-1bJc",
// )

// const response = await fetch("/account/api/getUserStatus")
// const { userId } = await response.json()

export const load: PageServerLoad = async ({
  locals: { supabase, safeGetSession },
}) => {
  // Get the authenticated user's session
  const { session } = await safeGetSession()

  if (!session) {
    throw redirect(303, "/login") // Redirect to login if no session
  }

  // Use the authenticated user's ID
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("userId", session.user.id)
    .order("created_at", { ascending: false })
    .limit(1000)

  if (error) {
    console.error("Error fetching conversations:", error)
    throw new Error("Could not load conversations")
  }

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
