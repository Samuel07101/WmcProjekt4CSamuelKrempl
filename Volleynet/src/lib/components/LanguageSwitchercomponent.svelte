<script>
    import { i18n } from '$lib/i18n/index.svelte.js';

    let isEnglish = $state(i18n.locale === 'en');

    $effect(() => {
        i18n.locale = isEnglish ? 'en' : 'de';
    });
</script>

<div class="language-switch-container">
    <span class="lang-label" class:active={i18n.locale === 'de'}>DE</span>
    
    <label class="switch" for="lang-toggle">
        <input 
            id="lang-toggle" 
            type="checkbox" 
            bind:checked={isEnglish} 
        />
        <span class="slider"></span>
    </label>
    
    <span class="lang-label" class:active={i18n.locale === 'en'}>EN</span>
</div>

<style>
    .language-switch-container {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 8px 14px;
        background-color: #f1f5f9;
        border-radius: 20px;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        user-select: none;
    }

    .lang-label {
        font-size: 0.85rem;
        font-weight: 600;
        color: #94a3b8;
        transition: color 0.2s ease;
    }

    .lang-label.active {
        color: #1e293b;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 44px;
        height: 24px;
        cursor: pointer;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #cbd5e1;
        transition: background-color 0.2s ease;
        border-radius: 24px;
    }

    .slider::before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 50%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    input:checked + .slider {
        background-color: #3b82f6;
    }

    input:focus-visible + .slider {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }

    input:checked + .slider::before {
        transform: translateX(20px);
    }
</style>