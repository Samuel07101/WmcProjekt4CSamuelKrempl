<script>
    let {match} = $props();
    
</script>

{#if match && match.teamA}
    <div class="score-card">
        <span class="team">{match.teamA}</span>
        </div>
{:else}
    <div class="loading-placeholder">
        <p>Lade Match-Daten...</p>
    </div>
{/if}