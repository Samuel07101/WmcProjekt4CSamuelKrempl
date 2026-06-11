<script>
    import { goto } from "$app/navigation";
    import Tournamentlistcomponent from "$lib/components/+Tournamentlistcomponent.svelte";

   function showTournament(id,name){
        
        goto("/src/routes/beach/tournament");
   }

   function reloadList(){

   }
</script>

Turniername: <input type="text"/>

<Tournamentlistcomponent data = "" />

