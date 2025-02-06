<script lang="ts">
  import {
    WebsiteName,
    WebsiteBaseUrl,
    WebsiteDescription,
  } from "./../../../config"

  import { Auth } from "@supabase/auth-ui-svelte"
  import { sharedAppearance, oauthProviders } from "./login_config"
  import { goto } from "$app/navigation"
  import { onMount } from "svelte"
  import { page } from "$app/stores"

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

  let { data } = $props()
  let { supabase } = data

  onMount(() => {
    supabase.auth.onAuthStateChange((event) => {
      // Redirect to account after successful login
      if (event == "SIGNED_IN") {
        // Delay needed because order of callback not guaranteed.
        // Give the layout callback priority to update state or
        // we'll just bounch back to login when /account tries to load
        setTimeout(() => {
          goto("/account")
        }, 1)
      }
    })
  })
</script>

<svelte:head>
  <title>{WebsiteName}</title>
  <meta name="description" content={WebsiteDescription} />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonldScript}
</svelte:head>

<div
  class="grid grid-cols-2 min-h-screen bg-gradient-to-r from-pink-300 via-blue-300 to-indigo-300"
>
  <!-- Right Column -->
  <div
    class="  animate-gradient flex items-center justify-center bg-gradient-to-br from-pink-300 via-blue-300 to-indigo-300"
  >
    <!-- Empty gradient background for aesthetic -->
  </div>

  <!-- Left Column -->
  <div class="flex flex-col justify-center items-start p-12 bg-white">
    <div class=" max-w-md m-auto">
      <div class="mb-4">
        <!-- <div class="text-xl font-bold mb-2">
          Hey, it’s Sage, how are you doing?
        </div> -->
        <p class="text-2xl">
          Pick up where you left off. The path never disappeared — you’re simply
          stepping back in.
        </p>
      </div>

      <div class="flex space-x-0 w-full">
        {#if $page.url.searchParams.get("verified") == "true"}
          <div role="alert" class="alert alert-success mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              /></svg
            >
            <span>Email verified! Please sign in.</span>
          </div>
        {/if}

        <Auth
          supabaseClient={data.supabase}
          view="sign_in"
          redirectTo={`${data.url}/auth/callback`}
          providers={oauthProviders}
          socialLayout="horizontal"
          showLinks={false}
          appearance={sharedAppearance}
          additionalData={undefined}
        />
      </div>
      <p class="mt-4 text-sm text-gray-500">
        By clicking Let’s talk, you agree to our
        <a href="#" class="underline">Terms of Service</a> and
        <a href="#" class="underline">Privacy Policy</a>.
      </p>
    </div>

    <a href="/login/sign_up"
      ><button class="btn btn-primary mt-3 btn-wide">Sign Up</button></a
    >
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
