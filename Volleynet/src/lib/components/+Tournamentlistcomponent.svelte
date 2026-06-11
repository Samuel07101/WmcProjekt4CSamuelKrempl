<script>
    const { data, showTournament } = $props();
</script>

<ul class="tournament-grid">
    {#each data as tournament}
        <li>
            <button 
                id={tournament.id} 
                onclick={() => showTournament(tournament.id, tournament.name)}
                class="tournament-card"
                aria-label="Turnier {tournament.name} anzeigen"
            >
                {#if tournament.picture}
                    <div class="image-container">
                        <img src={tournament.picture} alt="Logo vom Turnier {tournament.name}">
                    </div>
                {:else}
                    <div class="image-container placeholder">
                        <span class="placeholder-icon">🏆</span>
                    </div>
                {/if}
                
                <div class="card-content">
                    <span class="tournament-name">{tournament.name}</span>
                    <span class="action-hint">Details ansehen →</span>
                </div>
            </button>
        </li>
    {/each}
</ul>

<style>
    .tournament-grid {
        list-style: none;
        padding: 0;
        margin: 20px 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    .tournament-card {
        width: 100%;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        text-align: left;
        padding: 0;
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }

    .tournament-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
        border-color: #cbd5e1;
    }

    .tournament-card:focus-visible {
        outline: 3px solid #3b82f6;
        outline-offset: 2px;
    }

    .image-container {
        width: 100%;
        height: 160px;
        background-color: #f8fafc;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-bottom: 1px solid #f1f5f9;
    }

    .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .tournament-card:hover .image-container img {
        transform: scale(1.05);
    }

    .placeholder {
        background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    }

    .placeholder-icon {
        font-size: 2.5rem;
    }

    .card-content {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .tournament-name {
        font-size: 1.1rem;
        font-weight: 600;
        color: #1e293b;
        line-height: 1.4;
    }

    .action-hint {
        font-size: 0.85rem;
        font-weight: 500;
        color: #3b82f6;
        transition: color 0.2s;
    }

    .tournament-card:hover .action-hint {
        color: #2563eb;
    }
</style>