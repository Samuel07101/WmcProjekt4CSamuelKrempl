<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}


<nav class="header">
<p></p>
<a href="/home">Home</a>
<a href="/warenkorb">Licence</a>
<a href="/beach">Beach</a>
<a href="/news">News</a>

<a href="/profile">Profile</a>
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