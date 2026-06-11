<script>
    import { i18n } from "$lib/i18n/index.svelte.js";

    let { data = [], showTournament } = $props();

    function formatPrice(price) {
        if (price === 0 || price === 0.0 || price === '0.00') {
            return 'Free';
        }
        return typeof price === 'number' ? `${price.toFixed(2)} €` : `${price} €`;
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        try {
            const [datePart, timePart] = dateStr.split(' ');
            const [year, month, day] = datePart.split('-');
            return `${day}.${month}.${year} - ${timePart}`;
        } catch (e) {
            return dateStr;
        }
    }
</script>

<div class="tournament-grid">
    {#each data as tournament (tournament.id)}
        <div class="tournament-card">
            {#if tournament.picture}
                <div class="image-wrapper">
                    <img src={tournament.picture} alt={tournament.name} class="tournament-img" />
                </div>
            {:else}
                <div class="tournament-img-placeholder">
                    <span class="placeholder-icon">🏐</span>
                </div>
            {/if}
            
            <div class="card-content">
                <div class="card-meta">
                    <span class="date-tag">📅 {formatDate(tournament.start_time)}</span>
                    <span class="price-tag" class:free={tournament.price === 0}>
                        {formatPrice(tournament.price)}
                    </span>
                </div>

                <h3 class="tournament-title">{tournament.name}</h3>
                <p class="tournament-place">📍 {tournament.place}</p>
                
                {#if tournament.description}
                    <p class="tournament-desc">{tournament.description}</p>
                {/if}
                
                <button 
                    class="btn-view" 
                    onclick={() => showTournament(tournament.id, tournament.name)}
                >
                    Ansehen
                </button>
            </div>
        </div>
    {:else}
        <div class="no-results">
            <span class="no-results-icon">🔍</span>
            <p>Keine Turniere gefunden, die den Kriterien entsprechen.</p>
        </div>
    {/each}
</div>

<style>
    .tournament-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 24px;
        width: 100%;
        box-sizing: border-box;
    }

    .tournament-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .tournament-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .image-wrapper {
        width: 100%;
        height: 180px;
        overflow: hidden;
    }

    .tournament-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .tournament-img-placeholder {
        width: 100%;
        height: 180px;
        background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .placeholder-icon {
        font-size: 3.5rem;
        animation: float 3s ease-in-out infinite;
    }

    .card-content {
        padding: 20px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .card-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }

    .date-tag {
        font-size: 0.85rem;
        color: #64748b;
        font-weight: 500;
    }

    .price-tag {
        font-size: 0.85rem;
        font-weight: 700;
        padding: 4px 10px;
        background-color: #f1f5f9;
        color: #334155;
        border-radius: 20px;
    }

    .price-tag.free {
        background-color: #ecfdf5;
        color: #10b981;
    }

    .tournament-title {
        font-size: 1.2rem;
        font-weight: 700;
        color: #0f172a;
        margin: 0 0 6px 0;
        line-height: 1.4;
    }

    .tournament-place {
        font-size: 0.9rem;
        color: #475569;
        font-weight: 500;
        margin: 0 0 12px 0;
    }

    .tournament-desc {
        font-size: 0.9rem;
        color: #64748b;
        line-height: 1.5;
        margin: 0 0 20px 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .btn-view {
        margin-top: auto;
        width: 100%;
        padding: 10px;
        background-color: #3b82f6;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.15s ease;
    }

    .btn-view:hover {
        background-color: #2563eb;
    }

    .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 48px 16px;
        background-color: #ffffff;
        border: 1px dashed #cbd5e1;
        border-radius: 12px;
        color: #64748b;
    }

    .no-results-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 12px;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
    }
</style>