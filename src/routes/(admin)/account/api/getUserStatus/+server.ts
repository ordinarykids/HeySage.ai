// Temporarily use a generic type if $types is not available
// import type { RequestHandler } from "./$types"
import type { RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async ({
  locals: { supabase, safeGetSession },
}) => {
  //get the user id to access the db row
  const { session } = await safeGetSession()

  const userId = session?.user.id

  //get the user info from the db (not working returns null)
  const { data, error } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", session?.user.id)
    .single()

  if (data != null) {
    return new Response(userId)
  } else {
    return new Response("No data found", { status: 404 })
  }
}
