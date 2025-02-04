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

<div class="hero min-h-screen animate-gradient">
  <div class="hero-content text-center">
    <!-- <img src="/huga.png" alt="Huga" class="pb-4 w-[300px]" /> -->

    <div class="text-xl md:text-xl font-bold mb-3 md:mb-7 font-extralight">
      Sage - Early Access
      <button class="btn btn-black" on:click={handleConnectClick}>
        Let's Talk
      </button>
    </div>

    <div class="mt-4"></div>
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
    background: linear-gradient(45deg, #ffc0cb, #89cff0, #f5f5dc, #d2b48c);
    background-size: 400% 400%;
    animation: gradientShift 20s ease infinite;
  }
</style>
