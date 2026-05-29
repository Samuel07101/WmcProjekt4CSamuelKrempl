<script>
    import { goto } from "$app/navigation";

    const {profile} = $props();

    function toLogin(){
        goto("/src/routes/login")
    }

    function saveChangesOfProfile(){

    }
</script>
{#if profile != null}
    
Fullname: <input type="text" bind:value={profile.fullname} >
Country:  <select bind:value={profile.country}>
    {#each countries as ctry}
        <option value={ctry}>
            {ctry}
        </option>
    {/each}
</select>
Birthdate: <input type="date" bind:value={profile.birthdate}>
Email:  <input type="text" bind:value={profile.fullname}/>

<button onclick={saveChangesOfProfile}>Save changes</button>
{:else}
Want to Login or Register?
<button onclick={toLogin}>click here!</button>
{/if}
<style>

</style>