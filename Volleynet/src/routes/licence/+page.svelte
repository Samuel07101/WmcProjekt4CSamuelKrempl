<script>
    import { goto } from "$app/navigation";
    import { createUserInstance, userSession } from "..";

    let selectedLicence = $state('');
    let selectedClub = $state('');
    let clubs = $state('');
    let licences = $state('');

    let currentPrice = $derived(prices[selectedLicence] || 0.00);

    function handleOrder() {
        if (!selectedLicence) {
            alert(i18n.t('error_null_licence_club') + '');
            return;
        }
        buyLicence(selectedLicence);
    }
</script>

<div class="page-container">
    {#if userSession.current != null}
        <div class="order-card">
            <h2 class="form-title">Lizenz erwerben</h2>
            
            <div class="form-group">
                <label for="licence">Licencetype</label>
                <div class="select-wrapper">
                    <select id="licence" bind:value={selectedLicence}>
                        <option value="" disabled selected>Bitte wählen...</option>
                        {#each licences as licence}
                            <option value={licence.id}>{licence.name} / {licence.price}</option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="verein">Verein</label>
                <div class="select-wrapper">
                    <select id="verein" bind:value={selectedClub}>
                        <option value="" disabled selected>Bitte wählen...</option>
                        {#each clubs as club}
                            <option value={club.id}>{club.name}</option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="price-display">
                <span class="price-label">{i18n.t('licence_price')}:</span>
                <span class="price-value">{currentPrice.toFixed(2)}€</span>
            </div>

            <button class="submit-btn" onclick={handleOrder}>
                Bestellen
            </button>
        </div>
    {:else}
        <div class="auth-card">
            <div class="auth-icon">🔒</div>
            <h1>{i18n.t('licence_login_required')}</h1>
            <button class="auth-btn" onclick={() => goto("/login")}>
                To Login
            </button>
        </div>
    {/if}
</div>

<style>
    .page-container {
        max-width: 500px;
        margin: 40px auto;
        padding: 0 16px;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    .order-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .form-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #0f172a;
        margin: 0 0 24px 0;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 20px;
    }

    .form-group label {
        font-size: 0.875rem;
        font-weight: 600;
        color: #475569;
    }

    .select-wrapper {
        position: relative;
    }

    .select-wrapper select {
        width: 100%;
        padding: 12px 16px;
        font-size: 1rem;
        color: #1e293b;
        background-color: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        appearance: none;
        cursor: pointer;
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    .select-wrapper select:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    .select-wrapper::after {
        content: "▼";
        font-size: 0.75rem;
        color: #64748b;
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
    }

    .price-display {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 28px 0;
        padding: 16px;
        background-color: #f8fafc;
        border-radius: 8px;
        border: 1px dashed #e2e8f0;
    }

    .price-label {
        font-size: 1rem;
        color: #475569;
        font-weight: 500;
    }

    .price-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: #10b981;
    }

    .submit-btn {
        width: 100%;
        padding: 14px;
        background-color: #3b82f6;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s, transform 0.1s;
    }

    .submit-btn:hover {
        background-color: #2563eb;
    }

    .submit-btn:active {
        transform: scale(0.98);
    }

    .auth-card {
        text-align: center;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 40px 32px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .auth-icon {
        font-size: 3rem;
        margin-bottom: 16px;
    }

    .auth-card h1 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1e293b;
        margin: 0 0 24px 0;
        line-height: 1.5;
    }

    .auth-btn {
        padding: 12px 24px;
        background-color: #0f172a;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .auth-btn:hover {
        background-color: #1e293b;
    }
</style>