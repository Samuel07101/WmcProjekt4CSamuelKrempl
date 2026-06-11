<script>
    import { goto } from "$app/navigation";
    import Tournamentlistcomponent from "$lib/components/+Tournamentlistcomponent.svelte";
    import { i18n } from "$lib/i18n/index.svelte";

    // Reaktive States für die Suche und die geladenen Turniere
    let searchQuery = $state('');
    let tournaments = $state([]);

    function showTournament(id, name) {
        goto(`/beach/tournament/${id}`);
    }

    // Holt die Daten von deinem Express-Backend (Port 3000)
    async function reloadList(query) {
        try {
            const url = query 
                ? `http://localhost:3000/tournaments?search=${encodeURIComponent(query)}`
                : 'http://localhost:3000/tournaments';
                
            const response = await fetch(url);
            const result = await response.json();
            
            if (result.ok) {
                tournaments = result.tournaments;
            }
        } catch (error) {
            console.error("Fehler beim Laden der Turniere:", error);
        }
    }

    // Svelte 5 Rune: Reagiert automatisch, sobald sich 'searchQuery' ändert
    $effect(() => {
        const currentQuery = searchQuery; // Synchroner Lesezugriff für das Dependency-Tracking
        reloadList(currentQuery);
    });
</script>

<div class="page-container">
    <div class="search-section">
        <label for="tournament-search" class="search-label">
            {i18n.t('beach_tournament_name')}
        </label>
        <div class="input-wrapper">
            <input 
                id="tournament-search" 
                type="text" 
                bind:value={searchQuery}
                placeholder="Suchen..."
                class="search-input"
            />
            <span class="search-icon">🔍</span>
        </div>
    </div>

    <main class="content-section">
        <Tournamentlistcomponent data={tournaments} showTournament={showTournament} />
    </main>
</div>

<style>
    .page-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 24px;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    .search-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 32px;
        max-width: 400px;
    }

    .search-label {
        font-size: 0.95rem;
        font-weight: 600;
        color: #334155;
    }

    .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .search-input {
        width: 100%;
        padding: 12px 16px 12px 40px;
        font-size: 1rem;
        color: #1e293b;
        background-color: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    .search-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    .search-input::placeholder {
        color: #94a3b8;
    }

    .search-icon {
        position: absolute;
        left: 14px;
        color: #94a3b8;
        font-size: 1.1rem;
        pointer-events: none;
    }

    .content-section {
        width: 100%;
    }
</style>