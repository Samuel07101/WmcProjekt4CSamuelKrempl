<script>
    const { data } = $props();
    const tournament = $state(data.tournament);
</script>

Turniername: {tournament.name}
<br>
Place: {tournament.place}      Price:{tournament.price}     Starttime: {tournament.start}
<br>    
<h5>Descripiton</h5>
{tournament.description}

