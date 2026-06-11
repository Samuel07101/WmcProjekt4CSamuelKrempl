
/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const response = await fetch('https://localhost:3000/tournament');
    const ret = await response.json();
    const tournament = ret.res;
    if(ret.ok){
        return tournament;
    }
    return false;
}  