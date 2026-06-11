<script>
  import Scorecomponent from '$lib/components/+Scorecomponent.svelte';
  import { i18n } from '$lib/i18n/index.svelte.js';
 
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
 
<div class="dashboard-container">
  <header class="page-header">
    <h1>{i18n.t('home_title')}</h1>
  </header>
 
  {#if matches.matchA && matches.matchB}
    <section class="scores-section">
      <Scorecomponent match={matches.matchA} />
      <Scorecomponent match={matches.matchB} />
    </section>
  {/if}
 
  <section class="slider-section">
    <div class="slider-wrapper">
      {#if news.length > 0}
        <button class="slider-btn prev" onclick={prevImage} aria-label={i18n.t('home_prev')}>
          ‹
        </button>
        
        <div class="image-container">
          <img src={news[currentIndex]} alt="News Slider" />
        </div>
        
        <button class="slider-btn next" onclick={nextImage} aria-label={i18n.t('home_next')}>
          ›
        </button>

        <div class="slider-dots">
          {#each news as _, index}
            <div class="dot" class:active={currentIndex === index}></div>
          {/each}
        </div>
      {:else}
        <div class="no-images">
          <p>{i18n.t('home_no_images')}</p>
        </div>
      {/if}
    </div>
  </section>
</div>
 
<style>
  .dashboard-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 32px 16px;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .page-header h1 {
    font-size: 2.25rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
  }
 
  .scores-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
 
  .slider-section {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .slider-wrapper {
    position: relative;
    width: 100%;
    max-width: 800px;
    height: 450px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
 
  .image-container {
    width: 100%;
    height: 100%;
    background-color: #f1f5f9;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
 
  .slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    font-size: 1.75rem;
    font-weight: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #1e293b;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: background 0.2s, transform 0.2s, color 0.2s;
    z-index: 10;
  }
 
  .slider-btn:hover {
    background: #ffffff;
    color: #3b82f6;
    transform: translateY(-50%) scale(1.05);
  }

  .slider-btn:active {
    transform: translateY(-50%) scale(0.95);
  }

  .prev { left: 20px; }
  .next { right: 20px; }

  .slider-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transition: width 0.2s, background-color 0.2s;
  }

  .dot.active {
    width: 24px;
    border-radius: 4px;
    background: #ffffff;
  }

  .no-images {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    border: 2px dashed #cbd5e1;
    border-radius: 16px;
    color: #64748b;
  }
</style>