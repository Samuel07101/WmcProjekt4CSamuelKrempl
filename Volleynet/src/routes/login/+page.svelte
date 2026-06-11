<script>
    import { goto } from '$app/navigation';
	import { createUserInstance, userSession } from '..';
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

<h1>{isLogin ? i18n.t('login_title') : i18n.t('register_title')}</h1>

{#if isLogin}
	<div>
		{i18n.t('login_email')}: <input type="text" bind:value={email} />
	</div>
	<div>
		{i18n.t('login_password')}: <input type="password" bind:value={password} />
	</div>
{:else}
	<div>
		{i18n.t('login_fullname')}: <input type="text" bind:value={fullName} />
	</div>
	<div>
		{i18n.t('login_country')}:
		<select bind:value={country}>
			{#each countries as ctry}
				<option value={ctry}>{ctry}</option>
			{/each}
		</select>
	</div>
	<div>
		<input type="date" bind:value={birthdate} />
	</div>
	<div>
		{i18n.t('login_email')}: <input type="text" bind:value={email} />
	</div>
	<div>
		{i18n.t('login_password')}: <input type="password" bind:value={password} />
	</div>
{/if}

<button onclick={swap}>
	{isLogin ? i18n.t('login_switch_to_register') : i18n.t('login_switch_to_login')}
</button>
<button onclick={loginOrRegistration}>
	{isLogin ? i18n.t('login_btn') : i18n.t('register_btn')}
</button>
