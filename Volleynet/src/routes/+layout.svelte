<script>
    import favicon from '$lib/assets/favicon.svg';
    import { i18n } from '$lib/i18n/index.svelte';
    
    import { page } from '$app/stores';

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="app-layout">
    <nav class="header">
        <div class="logo-section">
            <img src={favicon} alt="Logo" class="nav-logo" />
            <span class="brand-name">TournamentHub</span>
        </div>
        
        <div class="nav-links">
            <a href="/home" class:active={$page.url.pathname === '/home'}>
                {i18n.t('nav_home')}
            </a>
            <a href="/licence" class:active={$page.url.pathname === '/licence'}>
                {i18n.t('nav_licence')}
            </a>
            <a href="/beach" class:active={$page.url.pathname.startsWith('/beach')}>
                {i18n.t('nav_beach')}
            </a>
            <a href="/profile" class:active={$page.url.pathname === '/profile'}>
                {i18n.t('nav_profile')}
            </a>
        </div>

    </nav>

    <main class="main-content">
        {@render children()}
    </main>
</div>

<style>
    :global(body) {
        margin: 0;
        background-color: #f8fafc;
    }

    .app-layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 64px;
        padding: 0 24px;
        box-sizing: border-box;
        background-color: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(8px);
        border-bottom: 1px solid #e2e8f0;
        z-index: 1000;
    }

    .logo-section {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .nav-logo {
        width: 28px;
        height: 28px;
    }

    .brand-name {
        font-weight: 700;
        font-size: 1.1rem;
        color: #0f172a;
        letter-spacing: -0.025em;
    }

    .nav-links {
        display: flex;
        align-items: center;
        gap: 8px;
        height: 100%;
    }

    .nav-links a {
        text-decoration: none;
        color: #64748b;
        font-size: 0.95rem;
        font-weight: 500;
        padding: 8px 16px;
        border-radius: 8px;
        transition: color 0.2s ease, background-color 0.2s ease;
    }

    .nav-links a:hover {
        color: #1e293b;
        background-color: #f1f5f9;
    }

    .nav-links a.active {
        color: #3b82f6;
        background-color: #eff6ff;
        font-weight: 600;
    }

    .main-content {
        margin-top: 64px;
        flex: 1;
        width: 100%;
        box-sizing: border-box;
    }
</style>