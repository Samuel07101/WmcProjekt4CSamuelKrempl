<script>
    import { i18n } from '$lib/i18n/index.svelte.js';
    const { data } = $props();
    const tournament = $state(data.tournament);
</script>


{i18n.t('tournament_name')}: {tournament.name}
<br />
{i18n.t('tournament_place')}: {tournament.place} &nbsp;&nbsp;
{i18n.t('tournament_price')}: {tournament.price} &nbsp;&nbsp;
{i18n.t('tournament_starttime')}: {tournament.start}
<br />
<h5>{i18n.t('tournament_description')}</h5>
{tournament.description}
