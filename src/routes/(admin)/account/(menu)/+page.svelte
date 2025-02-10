<script lang="ts">
  import { goto } from "$app/navigation"
  import {
    WebsiteName,
    WebsiteBaseUrl,
    WebsiteDescription,
  } from "../../../../config"

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: WebsiteName,
    url: WebsiteBaseUrl,
  }
  const jsonldScript = `<script type="application/ld+json">${
    JSON.stringify(ldJson) + "<"
  }/script>`

  function handleConnectClick() {
    goto("/account/")
  }

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
    console.log(data.conversations)
    //console.log("_______" + profile?.full_name)

    let combinedTranscripts = data.conversations
      .map((c) => c.transcript)
      .reverse()
      .join(" ")
    console.log("Combined Transcripts:", combinedTranscripts)

    vapi = new Vapi("431d834a-a9f4-422b-ac70-c00be149714d")
    const assistantOverrides = {
      model: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Here are the last 50 messages from the user" +
              combinedTranscripts,
          },
        ],
      },
      recordingEnabled: true,
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
      saveMessageToSupabase(message)

      console.log(message)
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
  <title>{WebsiteName}</title>
  <meta name="description" content={WebsiteDescription} />
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

<div class="min-h-screen w-full">
  <!-- Desktop gradient background - hidden on mobile -->
  <div
    class="animate-gradient hidden md:block fixed inset-0 bg-gradient-to-br from-pink-200 via-blue-200 to-purple-200"
  ></div>

  <!-- Mobile header - only visible on mobile -->
  <div class="md:hidden w-full h-2 bg-pink-200"></div>

  <!-- Content container -->
  <div
    class="relative w-full md:w-1/2 px-6 md:px-0 md:ml-auto min-h-screen flex flex-col justify-center bg-white"
  >
    <!-- Wave icon -->
    <div class="mb-8">
      <img src="/wave.svg" alt="Wave" class="w-10 h-10 mx-auto mt-16" />
    </div>

    <div class="max-w-md m-auto">
      <!-- Text content -->
      <h1 class="text-2xl font-medium mb-4">
        Hey, it's Sage, how are you doing?
      </h1>

      <p class="mb-4">Glad you found your way here. So, here is the deal.</p>

      <p class="my-16">
        I am here to help you discover the your true path. It may lead to places
        you never imagined or it may wind it's way back to where you started.
      </p>
      <button
        class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        onclick={handleConnectClick}
      >
        Let's talk
      </button>
      <button
        class="border border-gray-400 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
      >
        Learn more
      </button>

      <!-- Footer text -->
      <p class="text-sm text-gray-600 mt-16 w-36">
        By clicking Let's talk, you agree to our
        <a href="#" class="underline">Terms of Service</a>
        and
        <a href="#" class="underline">Privacy Policy</a>.
      </p>
    </div>
  </div>
</div>

<style>
  /* Define keyframes for the animated gradient */
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    25% {
      background-position: 50% 0%;
    }
    50% {
      background-position: 100% 50%;
    }
    75% {
      background-position: 50% 100%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* Custom class to apply the gradient background and animation */
  .animate-gradient {
    /* Define the gradient with your chosen colors:
       - Pink: #FFC0CB
       - Baby Blue: #89CFF0
       - Beige: #F5F5DC
       - Natural (tan): #D2B48C
    */
    background: linear-gradient(45deg, #ee9191, #fac2f1, #a6cdda, #92a8dc);
    background-size: 400% 400%;
    animation: gradientShift 20s ease infinite;
  }
</style>
