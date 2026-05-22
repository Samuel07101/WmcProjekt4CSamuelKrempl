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
<div>
Email: <input type="text" bind:value={email}>
</div>
<div>
Password: <input type="password" bind:value={password}>
</div>
{:else}
<div>
Fullname: <input type="text" bind:value={fullName}>
</div>
<div>
Country: <select bind:value={country}>
    {#each countries as ctry}
        <option value={ctry}>
            {ctry}
        </option>
    {/each}
</select>
</div>
<div>
<input type="date" bind:value={date}>
</div>
<div>
<input type="text" bind:value={email}>
</div>
<div>
<input type="password" bind:value={password}>
</div>
{/if}

<button onclick={swap}>To {swapText}</button>
<button onclick={loginOrRegistration()}>{btnText}</button>
