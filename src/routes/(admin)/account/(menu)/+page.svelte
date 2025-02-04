<script lang="ts">
  import { getContext } from "svelte"

  import type { Writable } from "svelte/store"
  import Vapi from "@vapi-ai/web"
  // import { PUBLIC_VAPI_API_KEY } from "$env/static/public"

  let adminSection: Writable<string> = getContext("adminSection")
  adminSection.set("settings")

  let { data } = $props()
  let { profile } = data

  // let adminSection: Writable<string> = getContext("adminSection")
  adminSection.set("home")

  let vapi: Vapi

  $effect(() => {
    vapi = new Vapi("431d834a-a9f4-422b-ac70-c00be149714d")
    const assistantOverrides = {
      recordingEnabled: false,
      variableValues: {
        name: profile?.full_name || "",
      },
    }

    vapi.start("ab4bb979-c91c-4354-ae9c-b69c21073eef", assistantOverrides)

    const saveMessageToSupabaseOLD = async (message: any) => {
      // console.log("_______" + message.transcript)
      const response = await fetch("/account/api?/saveMessage", {
        method: "POST",
        body: JSON.stringify(message),
      })
      // console.log(response.body)
    }

    async function saveMessageToSupabase(message) {
      //console.log(profile)
      const response = await fetch("/account/api/saveMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: {
            transcript: message.transcript,
            transcriptType: message.transcriptType,
            created_at: new Date().toISOString(),
            role: message.role,
            message: message,
            userId: profile.id,
          },
        }),
      })

      const result = await response.json()
      //console.log(result)
    }

    vapi.on("message", (message) => {
      " saveMessageToSupabase(message)"
      if (message.transcriptType === "final") {
        //console.log(message)
        saveMessageToSupabase(message)
      }

      if (message.type === "transcript" && message.transcriptType === "final") {
        //saveMessage(message)
      }
    })

    // // Function calls and transcripts will be sent via messages
    // vapi.on("message", async (message) => {
    //   console.log(message)
    //   if (
    //     message.transcriptType === "user" ||
    //     message.transcriptType === "assistant"
    //   ) {
    //     saveMessageToSupabase()
    //   }
    // })

    function stop() {
      vapi.stop()
    }
  })

  function stopVapi() {
    vapi.stop()
  }
</script>

<svelte:head>
  <title>Account</title>
</svelte:head>
{profile?.full_name}

<!-- <ul>
  {#each data.conversations as conversation}
    <li>{conversation.transcript}</li>
  {/each}
</ul> -->

<button
  class="bottom-1 border-2 border-red-500 p-2"
  onclick={() => {
    stopVapi()
  }}>Clicasdasdk me</button
>
<h1 class="text-2xl font-bold mb-1">Dashboard</h1>
<!-- <div class="alert alert-error max-w-lg mt-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="stroke-current shrink-0 h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    ><path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    /></svg
  >
  <div>
    <div class="font-bold">Demo Content</div>
    <div class="my-2">
      This page is just a placeholder. Replace this page with your app's content
      and functionality.
    </div>
    <div class="my-2">
      The <a href="/account/billing" class="link">billing</a> and
      <a href="/account/settings" class="link">settings</a> pages are functional
      demos.
    </div>
  </div>
</div> -->
<!-- 
<div class="my-6">
  <h1 class="text-xl font-bold mb-1">Users</h1>
  <div class="stats shadow stats-vertical sm:stats-horizontal sm:w-[420px]">
    <div class="stat place-items-center">
      <div class="stat-title">Downloads</div>
      <div class="stat-value">31K</div>
      <div class="stat-desc">↗︎ 546 (2%)</div>
    </div>

    <div class="stat place-items-center">
      <div class="stat-title">Users</div>
      <div class="stat-value text-secondary">4,200</div>
      <div class="stat-desc">↗︎ 40 (2%)</div>
    </div>
  </div>
</div>
<div class="my-6">
  <h1 class="text-xl font-bold mb-1">Accounts</h1>
  <div class="stats shadow stats-vertical sm:stats-horizontal sm:w-[420px]">
    <div class="stat place-items-center">
      <div class="stat-title">New Registers</div>
      <div class="stat-value">1,200</div>
      <div class="stat-desc">↘︎ 90 (14%)</div>
    </div>

    <div class="stat place-items-center">
      <div class="stat-title">Churned Accounts</div>
      <div class="stat-value">42</div>
      <div class="stat-desc">↘︎ 6 (12%)</div>
    </div>
  </div>
</div>
<div class="my-6">
  <h1 class="text-xl font-bold mb-1">Revenue</h1>
  <div class="stats shadow stats-vertical sm:stats-horizontal sm:w-[420px]">
    <div class="stat place-items-center">
      <div class="stat-title text-success">Revenue</div>
      <div class="stat-value text-success">$4200</div>
      <div class="stat-desc">↗︎ $180 (4%)</div>
    </div>

    <div class="stat place-items-center">
      <div class="stat-title">New Subscribers</div>
      <div class="stat-value">16</div>
      <div class="stat-desc">↘︎ 1 (%7)</div>
    </div>
  </div>
</div> -->
