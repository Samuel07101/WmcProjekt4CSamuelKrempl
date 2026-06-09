<script>
    
	let selectedLicence = $state('');
	let selectedVerein = $state('');

	
	const prices = {
		'Standard': 15.00,
		'Premium': 49.90,
		'Professional': 99.00
	};


	let currentPrice = $derived(prices[selectedLicence] || 0.00);

	function handleOrder() {
		console.log('Bestellt:', { selectedLicence, selectedVerein, currentPrice });
	}
</script>

<div>
		<label for="licence">Licencetype</label>
		<select id="licence" bind:value={selectedLicence}>
			<option value="" disabled selected>Select</option>
			<option value="Standard">Standard</option>
			<option value="Premium">Premium</option>
			<option value="Professional">Professional</option>
		</select>
	</div>

	<div>
		<label for="verein">Verein</label>
		<select id="verein" bind:value={selectedVerein}>
			<option value="" disabled selected>Select</option>
			<option value="Verein A">Verein A</option>
			<option value="Verein B">Verein B</option>
		</select>
	</div>

	<div>
		Price: {currentPrice.toFixed(2)}€
	</div>

	<button onclick={handleOrder}>
		bestellen
	</button>
