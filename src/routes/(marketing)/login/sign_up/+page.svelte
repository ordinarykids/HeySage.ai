<script lang="ts">
  import { Auth } from "@supabase/auth-ui-svelte"
  import { sharedAppearance, oauthProviders } from "../login_config"

  let { data } = $props()
</script>

<svelte:head>
  <title>Sign up</title>
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
        <h1 class="text-2xl font-bold mb-6">Sign Up</h1>
        <Auth
          supabaseClient={data.supabase}
          view="sign_up"
          redirectTo={`${data.url}/auth/callback`}
          showLinks={false}
          providers={oauthProviders}
          socialLayout="horizontal"
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
