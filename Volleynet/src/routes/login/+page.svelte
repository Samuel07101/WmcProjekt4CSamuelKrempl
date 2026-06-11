<script>
    import { goto } from '$app/navigation';
    import { userSession } from '..';
    import { i18n } from '$lib/i18n/index.svelte.js';

    let isLogin = $state(true);

    let email = $state('');
    let password = $state('');
    let fullName = $state('');
    let birthdate = $state('');
    let country = $state('AT');
    const countries = $state(['AT', 'DE', 'CH']);

    function loginOrRegistration() {
        let ret = false;
        if (isLogin) {
            const user = { email, password };
            ret = login(user);
        } else {
            const user = { fullName, birthdate, country, email, password };
            ret = register(user);
        }

        if (ret.id >= 0) {
            userSession.current = user;
            goto('/home');
        }
    }

    function swap() {
        isLogin = !isLogin;
    }
</script>

<div class="auth-container">
    <div class="auth-card">
        <h1 class="auth-title">
            {isLogin ? i18n.t('login_title') : i18n.t('register_title')}
        </h1>

        <div class="form-fields">
            {#if isLogin}
                <div class="form-group">
                    <label for="login-email">{i18n.t('login_email')}</label>
                    <input id="login-email" type="email" bind:value={email} placeholder="example@mail.com" />
                </div>
                <div class="form-group">
                    <label for="login-password">{i18n.t('login_password')}</label>
                    <input id="login-password" type="password" bind:value={password} placeholder="••••••••" />
                </div>
            {:else}
                <div class="form-group">
                    <label for="reg-fullname">{i18n.t('login_fullname')}</label>
                    <input id="reg-fullname" type="text" bind:value={fullName} placeholder="Max Mustermann" />
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="reg-country">{i18n.t('login_country')}</label>
                        <div class="select-wrapper">
                            <select id="reg-country" bind:value={country}>
                                {#each countries as ctry}
                                    <option value={ctry}>{ctry}</option>
                                  {/each}
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="reg-birthdate">Geburtsdatum</label>
                        <input id="reg-birthdate" type="date" bind:value={birthdate} />
                    </div>
                </div>
                <div class="form-group">
                    <label for="reg-email">{i18n.t('login_email')}</label>
                    <input id="reg-email" type="email" bind:value={email} placeholder="example@mail.com" />
                </div>
                <div class="form-group">
                    <label for="reg-password">{i18n.t('login_password')}</label>
                    <input id="reg-password" type="password" bind:value={password} placeholder="••••••••" />
                </div>
            {/if}
        </div>

        <div class="action-buttons">
            <button class="btn-primary" onclick={loginOrRegistration}>
                {isLogin ? i18n.t('login_btn') : i18n.t('register_btn')}
            </button>
            
            <button class="btn-secondary" onclick={swap}>
                {isLogin ? i18n.t('login_switch_to_register') : i18n.t('login_switch_to_login')}
            </button>
        </div>
    </div>
</div>

<style>
    .auth-container {
        max-width: 450px;
        margin: 60px auto;
        padding: 0 16px;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    .auth-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 40px 32px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    }

    .auth-title {
        font-size: 1.75rem;
        font-weight: 800;
        color: #0f172a;
        margin: 0 0 32px 0;
        text-align: center;
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
        grid-template-columns: 1fr 2fr;
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

    .action-buttons {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .btn-primary {
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

    .btn-primary:hover {
        background-color: #2563eb;
    }

    .btn-secondary {
        width: 100%;
        padding: 12px;
        background-color: transparent;
        color: #64748b;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s, color 0.2s;
    }

    .btn-secondary:hover {
        background-color: #f8fafc;
        color: #1e293b;
    }
</style>