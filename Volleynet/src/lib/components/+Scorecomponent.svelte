<script>
    const {match} = $props();
    
</script>

<ul>  
    <li>
        {match.teamAName} {match.teamAScore}
    </li>
    <li>
        <dir></dir>
    </li>
    <li>
        {match.teamBName} {match.teamBScore}
    </li>
</ul>
