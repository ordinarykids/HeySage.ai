import { redirect } from "@sveltejs/kit"

import { supabase } from "$lib/supabaseClient"

export async function load() {
  const { data } = await supabase.from("conversations").select()
  console.log(data)
  return {
    conversations: data ?? [],
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
