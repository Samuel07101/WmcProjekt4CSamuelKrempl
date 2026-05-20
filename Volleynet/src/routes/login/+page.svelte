<script>
    const butText = $state('Login');
    let name = $state('')

    function btnLogin(){

    }
</script>


{#if butText === 'Login'}
    <h1>Login</h1>

<input type="text" bind:innerText={name} contenteditable="true">

<button onclick={btnLogin()}>{butText}</button>
{/if}

