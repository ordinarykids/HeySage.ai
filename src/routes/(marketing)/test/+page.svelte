<script>
  import { onMount } from "svelte"

  // Grid dimensions
  const gridRows = 4
  const gridCols = 4

  // The grid is an array of rows, where each row is an array of cell objects.
  let grid = []

  // The player’s starting position (top-left).
  let player = { row: 0, col: 0 }

  // Generate a grid where each cell holds a random image URL.
  function generateGrid() {
    grid = []
    for (let i = 0; i < gridRows; i++) {
      const row = []
      for (let j = 0; j < gridCols; j++) {
        // Generate a random seed so each image is unique.
        const seed = Math.floor(Math.random() * 1000)
        row.push({
          id: `${i}-${j}`,
          src: `https://picsum.photos/seed/${seed}/200/200`,
          collected: false,
        })
      }
      grid.push(row)
    }
  }

  // Set up the grid and add a global keydown event listener when the component mounts.
  onMount(() => {
    generateGrid()
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  })

  // Handle keyboard input (arrow keys or WASD) to move the player.
  function handleKeyDown(e) {
    let { row, col } = player

    if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
      row = Math.max(0, row - 1)
    } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
      row = Math.min(gridRows - 1, row + 1)
    } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
      col = Math.max(0, col - 1)
    } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
      col = Math.min(gridCols - 1, col + 1)
    }

    player = { row, col }

    // If the cell hasn’t been collected yet, mark it as collected.
    if (!grid[row][col].collected) {
      grid[row][col].collected = true
      // Reassign the grid to trigger Svelte's reactivity (needed for nested object updates).
      grid = grid
    }
  }

  // Reactive declaration that checks whether all cells have been collected.
  $: allCollected =
    grid.length > 0 && grid.flat().every((cell) => cell.collected)
</script>

<div class="w-full h-screen animate-gradient"></div>
<main class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-4">Image Grid Game</h1>

  <!-- Grid container using Tailwind's grid classes (4 columns, with gaps) -->
  <div class="grid grid-cols-4 gap-2">
    {#each grid as row, i}
      {#each row as cell, j}
        <div class="relative">
          <!-- Display the random image -->
          <img src={cell.src} alt="Random Image" class="w-full h-auto" />

          <!-- Highlight the player's current cell with a blue border -->
          {#if i === player.row && j === player.col}
            <div
              class="absolute inset-0 border-4 border-blue-500 pointer-events-none"
            ></div>
          {/if}

          <!-- Overlay to indicate that the cell has been collected -->
          {#if cell.collected}
            <div
              class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <span class="text-white font-bold">Collected!</span>
            </div>
          {/if}
        </div>
      {/each}
    {/each}
  </div>

  <!-- Display a congratulatory message when all images have been collected -->
  {#if allCollected}
    <div class="mt-4 p-4 bg-green-200 text-green-800 rounded-lg">
      <p class="text-xl font-bold">
        Congratulations! You collected all images!
      </p>
    </div>
  {/if}

  <p class="mt-4">
    Use the arrow keys or WASD to move the player and collect the images.
  </p>
</main>

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
