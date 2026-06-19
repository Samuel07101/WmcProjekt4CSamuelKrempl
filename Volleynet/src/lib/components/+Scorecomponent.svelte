<script>
    let {match} = $props();
    console.log(match);
</script>

{#if match && match.teamA}
 <h3>{match.date}</h3>
    <div class="score-card">
        <span class="team">{match.teamA}</span>
        <span>{match.scoreA}</span>
        <dir></dir>
        <span class="team">{match.teamB}</span>
        <span>{match.scoreB}</span>
        </div>
{:else}
    <div class="loading-placeholder">
        <p>Lade Match-Daten...</p>
    </div>
{/if}