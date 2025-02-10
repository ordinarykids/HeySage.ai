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

<div class="min-h-screen w-full">
  <!-- Desktop gradient background - hidden on mobile -->
  <div
    class="animate-gradient hidden md:block fixed inset-0 bg-gradient-to-br from-pink-200 via-blue-200 to-purple-200"
  />

  <!-- Mobile header - only visible on mobile -->
  <div class="md:hidden w-full h-2 bg-pink-200" />

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
        on:click={handleConnectClick}
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
