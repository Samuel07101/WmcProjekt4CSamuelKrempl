<script>
	import { goto } from '$app/navigation';
	import { userSession } from '..';
	import { i18n } from '$lib/i18n/index.svelte.js';
 
	const profile = $state(userSession.current);
 
	function toLogin() {
		goto('/login');
	}
 
	function saveChangesOfProfile() {
		editUser(profile);
	}
</script>
 
{#if profile != null}
	<div>
		{i18n.t('profile_fullname')}: <input type="text" bind:value={profile.fullname} />
	</div>
	<div>
		{i18n.t('profile_country')}:
		<select bind:value={profile.country}>
			{#each countries as ctry}
				<option value={ctry}>{ctry}</option>
			{/each}
		</select>
	</div>
	<div>
		{i18n.t('profile_birthdate')}: <input type="date" bind:value={profile.birthdate} />
	</div>
	<div>
		{i18n.t('profile_email')}: <input type="text" bind:value={profile.email} />
	</div>
 
	<button onclick={saveChangesOfProfile}>{i18n.t('profile_save')}</button>
{:else}
	{i18n.t('profile_login_prompt')}
	<button onclick={toLogin}>{i18n.t('profile_login_link')}</button>
{/if}
 
<style>
</style>
