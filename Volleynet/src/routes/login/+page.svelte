<script>
     

    let btnText = $state('Login');
    let swapText = $state('Registration');
    let email = $state('');
    let password = $state('');

    let fullName = $state('');
    let birthdate = $state('');
    let country = $state('AT')
    const countries = $state(['AT','DE','CH']);
    let date = $state();
    function loginOrRegistration(){
        if(btnText == 'Login'){
            const user = {email: email, password: password};
            login(user);
        }else{
            const user = {
            fullName: fullName,
            birthdate: birthdate,
            country: country,
            email: email,
            password: password
        };

        register(user);
        }
    }
    function swap(){
        const placeholder = btnText;
        btnText = swapText;
        swapText = placeholder;

        
    }
</script>

<h1>{btnText}</h1>

{#if btnText === 'Login'}
<input type="text" bind:value={email}>

<input type="password" bind:value={password}>
{:else}

<input type="text" bind:value={fullName}>
<select bind:value={country}>
    {#each countries as ctry}
        <option value={ctry}>
            {ctry}
        </option>
    {/each}
</select>

<input type="date" bind:value={date}>

<input type="text" bind:value={email}>

<input type="password" bind:value={password}>

{/if}

<button onclick={swap}>{swapText}</button>
<button onclick={loginOrRegistration()}>{btnText}</button>
