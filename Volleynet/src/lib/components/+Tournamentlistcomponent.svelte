<script>
    const {data, showTournament } = $props();
</script>

<li>
    {#each data as tournament}
        <div 
            id={tournament.id} 
            onclick={handleTournamentClick(tournament.id, tournament.name)}
            class="tournament-box"
        >
            <span>{tournament.name}</span>
            
            {#if tournament.picture != null}
                <img src={tournament.picture} alt="Logo vom Turnier {tournament.name}">
            {/if}
        </div>
    {/each}
</li>

<style>
   
    .tournament-box {
        cursor: pointer;
        list-style-type: none;
        padding: 10px;
    }
</style>