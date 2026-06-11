<script>
    import { goto } from '$app/navigation';
    import { userSession } from '..';
    import { i18n } from '$lib/i18n/index.svelte.js';
    import LanguageSwitchercomponent from '$lib/components/LanguageSwitchercomponent.svelte';
 
    const profile = $state(userSession.current);
    const countries = $state(['AT', 'DE', 'CH']);
 
    function toLogin() {
        goto('/login');
    }
 
    function saveChangesOfProfile() {
        editUser(profile);
    }
</script>
 
<div class="profile-container">
    <LanguageSwitchercomponent></LanguageSwitchercomponent>

    {#if profile != null}
        <div class="profile-card">
            <h1 class="profile-title">{i18n.t('profile_fullname')}</h1>
            
            <div class="form-fields">
                <div class="form-group">
                    <label for="prof-fullname">{i18n.t('profile_fullname')}</label>
                    <input id="prof-fullname" type="text" bind:value={profile.fullname} />
                </div>

                <div class="form-grid">
                    <div class="form-group">
                        <label for="prof-country">{i18n.t('profile_country')}</label>
                        <div class="select-wrapper">
                            <select id="prof-country" bind:value={profile.country}>
                                {#each countries as ctry}
                                    <option value={ctry}>{ctry}</option>
                                {/each}
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="prof-birthdate">{i18n.t('profile_birthdate')}</label>
                        <input id="prof-birthdate" type="date" bind:value={profile.birthdate} />
                    </div>
                </div>

                <div class="form-group">
                    <label for="prof-email">{i18n.t('profile_email')}</label>
                    <input id="prof-email" type="email" bind:value={profile.email} />
                </div>
            </div>

            <button class="btn-save" onclick={saveChangesOfProfile}>
                {i18n.t('profile_save')}
            </button>
        </div>
    {:else}
        <div class="unauthorized-card">
            <div class="icon-lock">👤</div>
            <p class="prompt-text">{i18n.t('profile_login_prompt')}</p>
            <button class="btn-login" onclick={toLogin}>
                {i18n.t('profile_login_link')}
            </button>
        </div>
    {/if}
</div>
 
<style>
    .profile-container {
        max-width: 550px;
        margin: 40px auto;
        padding: 0 16px;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    .profile-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 40px 32px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .profile-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #0f172a;
        margin: 0 0 32px 0;
    }

    .form-fields {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 32px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    .form-group label {
        font-size: 0.85rem;
        font-weight: 600;
        color: #475569;
    }

    .form-group input, 
    .select-wrapper select {
        width: 100%;
        padding: 12px 14px;
        font-size: 0.95rem;
        color: #1e293b;
        background-color: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        box-sizing: border-box;
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-group input:focus, 
    .select-wrapper select:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    .select-wrapper {
        position: relative;
    }

    .select-wrapper select {
        appearance: none;
        cursor: pointer;
        padding-right: 36px;
    }

    .select-wrapper::after {
        content: "▼";
        font-size: 0.7rem;
        color: #64748b;
        position: absolute;
        right: 14px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
    }

    .btn-save {
        width: 100%;
        padding: 14px;
        background-color: #3b82f6;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .btn-save:hover {
        background-color: #2563eb;
    }

    .unauthorized-card {
        text-align: center;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 48px 32px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .icon-lock {
        font-size: 3.5rem;
        margin-bottom: 16px;
    }

    .prompt-text {
        font-size: 1.05rem;
        color: #475569;
        margin: 0 0 24px 0;
        line-height: 1.5;
    }

    .btn-login {
        padding: 12px 28px;
        background-color: #0f172a;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        font-size: 0.95rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .btn-login:hover {
        background-color: #1e293b;
    }
</style>