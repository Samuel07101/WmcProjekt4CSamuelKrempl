<script>
  import Scorecomponent from "$lib/components/+Scorecomponent.svelte";

  let { data } = $props();

  const matches = $derived(data?.matches ?? {});
  const news = $derived(data?.news ?? []);

  let currentIndex = $state(0);

  function nextImage() {
    if (currentIndex >= news.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
  }

  function prevImage() {
    if (currentIndex <= 0) {
      currentIndex = news.length - 1;
    } else {
      currentIndex--;
    }
  }
</script>

<h1>Home</h1>

{#if matches.matchA && matches.matchB}
  <Scorecomponent match={matches.matchA} />  
  <Scorecomponent match={matches.matchB} />
{/if}

<div class="slider">
  <button onclick={prevImage}> links </button>

  {#if news.length > 0}
    <img src={news[currentIndex]} alt="Slider Bar" />
  {:else}
    <p>Keine Bilder geladen...</p>
  {/if}

  <button onclick={nextImage}> rechts </button>
</div>

<style>
  .slider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .slider img {
    width: 600px;
    height: 350px;
    object-fit: cover;
    border-radius: 12px;
  }

  .slider button {
    font-size: 2rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
</style>