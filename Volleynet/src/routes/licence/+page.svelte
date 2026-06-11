<script>
    import { goto } from "$app/navigation";
    import { createUserInstance, userSession } from "..";

	let selectedLicence = $state('');
	let selectedClub = $state('');
    let clubs = $state('');
    let licences = $state('');

	


	let currentPrice = $derived(prices[selectedLicence] || 0.00);

	function handleOrder() {
		
	}
</script>

{#if userSession.current != null}
    
<div>
		<label for="licence">Licencetype</label>
		<select id="licence" bind:value={selectedLicence}>
			{#each licences as licence}
                <option value={licence.id}>{licence.name} / {licence.price}</option>
            {/each}
		</select>
	</div>

	<div>
		<label for="verein">Verein</label>
		<select id="verein" bind:value={selectedClub}>
			{#each clubs as club}
                <option value={club.id}>{club.name}</option>
            {/each}
		</select>
	</div>

	<div>
		{i18n.t('licence_price')}: {currentPrice.toFixed(2)}€
	</div>

	<button onclick={handleOrder}>
		bestellen
	</button>
{:else}<h1>{i18n.t('licence_login_required')}</h1>

<button onclick={goto("/login")}>To Login</button>
{/if}
