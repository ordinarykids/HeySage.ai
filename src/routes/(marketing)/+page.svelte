<script lang="ts">
  import { goto } from "$app/navigation"
  import {
    WebsiteName,
    WebsiteBaseUrl,
    WebsiteDescription,
  } from "./../../config"

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
</script>

<svelte:head>
  <title>{WebsiteName}</title>
  <meta name="description" content={WebsiteDescription} />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonldScript}
</svelte:head>

<div class="grid grid-cols-2 min-h-screen">
  <!-- Right Column -->
  <div
    class=" animate-gradient flex items-center justify-center bg-gradient-to-br from-pink-300 via-blue-300 to-indigo-300"
  >
    <!-- Empty gradient background for aesthetic -->
  </div>

  <!-- Left Column -->
  <div class="flex flex-col justify-center items-start p-12 bg-white">
    <div class="max-w-md m-auto">
      <div class="mb-4">
        <div class="text-xl font-bold mb-2">
          Hey, it’s Sage, how are you doing?
        </div>
        <p class="text-lg">
          Glad you found your way here. So, here is the deal.
        </p>
      </div>
      <p class="mb-8 text-lg">
        I am here to help you discover your true path. It may lead to places you
        never imagined or it may wind its way back to where you started.
      </p>
      <div class="flex space-x-4">
        <button
          class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          on:click={handleConnectClick}
        >
          Let’s talk
        </button>
        <button
          class="border border-gray-400 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
        >
          Learn more
        </button>
      </div>
      <p class="mt-4 text-sm text-gray-500">
        By clicking Let’s talk, you agree to our
        <a href="#" class="underline">Terms of Service</a> and
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
