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

<div class="hero min-h-[60vh]">
  <div class="hero-content py-12">
    <div class="max-w-sm px-16">
      <svg
        width="178"
        height="179"
        viewBox="0 0 178 179"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="89.1029" cy="89.3546" r="88.7032" fill="black" />
      </svg>
      <span class="text-xl md:text-xl font-bold mb-3 md:mb-7 pb-1">Sage</span>

      <div class="mt-4">
        <button class="btn btn-primary" on:click={handleConnectClick}>
          Let's Talk
        </button>
      </div>
    </div>
  </div>
</div>
