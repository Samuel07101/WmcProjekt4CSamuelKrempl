<script>
    import { i18n } from '$lib/i18n/index.svelte';

    function changeLanguage(event) {
        const newLocale = event.target.value;
        
        if (typeof i18n.setLocale === 'function') {
            i18n.setLocale(newLocale);
        }
    }
</script>

<div class="language-switcher">
    <select value={i18n.locale} onchange={changeLanguage}>
        <option value="de">Deutsch</option>
        <option value="en">English</option>
    </select>
</div>

<style>
    select {
        padding: 6px 10px;
        border-radius: 6px;
        border: 1px solid #cbd5e1;
        background-color: white;
        font-size: 0.9rem;
        cursor: pointer;
    }
</style>