<script>
    import { i18n } from '$lib/i18n/index.svelte.js';
    const { data } = $props();
    const tournament = $state(data.tournament);
</script>

<div class="tournament-container">
    <header class="tournament-header">
        <span class="label">{i18n.t('tournament_name')}</span>
        <h1 class="tournament-title">{tournament.name}</h1>
    </header>

    <div class="meta-grid">
        <div class="meta-item">
            <span class="meta-icon">📍</span>
            <div class="meta-content">
                <span class="meta-label">{i18n.t('tournament_place')}</span>
                <span class="meta-value">{tournament.place}</span>
            </div>
        </div>

        <div class="meta-item">
            <span class="meta-icon">💰</span>
            <div class="meta-content">
                <span class="meta-label">{i18n.t('tournament_price')}</span>
                <span class="meta-value">{tournament.price}</span>
            </div>
        </div>

        <div class="meta-item">
            <span class="meta-icon">🕒</span>
            <div class="meta-content">
                <span class="meta-label">{i18n.t('tournament_starttime')}</span>
                <span class="meta-value">{tournament.start}</span>
            </div>
        </div>
    </div>

    <hr class="divider" />

    <section class="description-section">
        <h2 class="description-heading">{i18n.t('tournament_description')}</h2>
        <p class="description-text">{tournament.description}</p>
    </section>
</div>

<style>
    .tournament-container {
        max-width: 800px;
        margin: 40px auto;
        padding: 32px;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    .tournament-header {
        margin-bottom: 28px;
    }

    .tournament-header .label {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #64748b;
        font-weight: 700;
    }

    .tournament-title {
        font-size: 2.25rem;
        font-weight: 800;
        color: #0f172a;
        margin: 4px 0 0 0;
        line-height: 1.2;
    }

    .meta-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 28px;
    }

    .meta-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background-color: #f8fafc;
        border-radius: 8px;
        border: 1px solid #f1f5f9;
    }

    .meta-icon {
        font-size: 1.5rem;
    }

    .meta-content {
        display: flex;
        flex-direction: column;
    }

    .meta-label {
        font-size: 0.8rem;
        color: #64748b;
        font-weight: 500;
    }

    .meta-value {
        font-size: 1rem;
        font-weight: 600;
        color: #334155;
    }

    .divider {
        border: 0;
        height: 1px;
        background: #e2e8f0;
        margin: 0 0 28px 0;
    }

    .description-heading {
        font-size: 1.25rem;
        font-weight: 700;
        color: #1e293b;
        margin: 0 0 12px 0;
    }

    .description-text {
        font-size: 1rem;
        line-height: 1.6;
        color: #475569;
        margin: 0;
        white-space: pre-line;
    }
</style>

