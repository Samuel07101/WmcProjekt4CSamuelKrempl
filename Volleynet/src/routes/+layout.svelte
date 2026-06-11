<script>
	import favicon from '$lib/assets/favicon.svg';
	import { i18n } from '$lib/i18n/index.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}


<nav class="header">
	<p></p>
	<a href="/home">{i18n.t('nav_home')}</a>
	<a href="/warenkorb">{i18n.t('nav_licence')}</a>
	<a href="/beach">{i18n.t('nav_beach')}</a>
	<a href="/news">{i18n.t('nav_news')}</a>
	<a href="/profile">{i18n.t('nav_profile')}</a>
</nav>

<style>
	.header{
		display: flex;
		gap: 1rem;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
	}
</style>