// import type { RequestHandler } from '../$types';
export const testload = async ({ locals: { supabase, safeGetSession } }) => {
  //get the user id to access the db row
  const { session } = await safeGetSession()

  console.log(session?.user.id)

  //get the user info from the db (not working returns null)
  const { data, error } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", session?.user.id)
    .single()

  if (data != null) {
    return new Response(data.credits)
  } else {
    return new Response("No data found", { status: 404 })
  }
}

testload()
