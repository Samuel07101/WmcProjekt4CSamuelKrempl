<script>
    import { goto } from "$app/navigation";

     

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
        let ret;
        if(btnText == 'Login'){
            const user = {email: email, password: password};
             ret = login(user);
            if(ret){
               goto("/Volleynet/src/routes/home");
            }else{
                alert("Wrong Password or email please check!!");
            }

        }else{
            if(validateRegistration()){

            const user = {
            fullName: fullName,
            birthdate: birthdate,
            country: country,
            email: email,
            password: password
        };

         ret = register(user);
        }  
        }

        if(ret){
               goto("/Volleynet/src/routes/home");
            }else{
                alert("Wrong Password or email please check!!");
            }
    }
    function swap(){
        const placeholder = btnText;
        btnText = swapText;
        swapText = placeholder;

        
    }

    function validateRegistration(){

    if(fullName.trim() === ""){
        alert("Bitte Namen eingeben");
        return false;
    }

    if(email.trim() === ""){
        alert("Bitte E-Mail eingeben");
        return false;
    }

    // einfache Email Prüfung
    if(!email.includes("@")){
        alert("Ungültige E-Mail");
        return false;
    }

    if(password.trim() === ""){
        alert("Bitte Passwort eingeben");
        return false;
    }

    // Passwort Mindestlänge
    if(password.length < 6){
        alert("Passwort muss mindestens 6 Zeichen haben");
        return false;
    }

    if(birthdate === ""){
        alert("Bitte Geburtsdatum wählen");
        return false;
    }

    if(country === ""){
        alert("Bitte Land auswählen");
        return false;
    }

    return true;
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
