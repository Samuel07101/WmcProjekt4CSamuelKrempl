<script>
    import { goto } from "$app/navigation";
    import Tournamentlistcomponent from "$lib/components/+Tournamentlistcomponent.svelte";
    import { i18n } from "$lib/i18n/index.svelte";
   function showTournament(id,name){
        goto("/src/routes/beach/tournament{id}");
   }

   function reloadList(){

   }
</script>

{i18n.t('beach_tournament_name')}: <input type="text"/>

<Tournamentlistcomponent data = "" />

